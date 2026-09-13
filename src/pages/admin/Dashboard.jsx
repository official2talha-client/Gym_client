import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts'
import KPICard from '../../components/admin/KPICard'
import FlatCard from '../../components/ui/FlatCard'
import { Badge } from '../../components/ui/Badge'
import Timeline from '../../components/ui/Timeline'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import PillButton from '../../components/ui/PillButton'
import { api } from '../../lib/api'
import { formatBDT } from '../../lib/constants'
import {useGetAdminActionRecordsQuery,useGetTotalRevenueQuery} from '../../api/adminApi.js'
import { Link } from 'react-router-dom'
import DashboardCard from './DashboardCard.jsx'

const RANGES = ['7d', '30d', '90d', '1y']

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-white/10 bg-base px-3 py-2 text-xs text-white shadow-lg">
      <p className="text-ink-muted">{label}</p>
      <p className="font-bold text-accent-light">{formatBDT(payload[0].value)}</p>
    </div>
  )
}

export default function Dashboard() {
  const [range, setRange] = useState('30d')

  const kpiQuery = useQuery({ queryKey: ['admin-kpis'], queryFn: api.getKpis })
  const trendQuery = useQuery({ queryKey: ['admin-revenue', range], queryFn: () => api.getRevenueTrend(range) })
  const distQuery = useQuery({ queryKey: ['admin-plan-dist'], queryFn: api.getPlanDistribution })
  const activityQuery = useQuery({ queryKey: ['admin-activity'], queryFn: api.getActivityFeed })
  const expiringQuery = useQuery({ queryKey: ['admin-expiring'], queryFn: api.getExpiringMembers })

  // actual data 
const {data:actionData,isLoading:actionLoadin,isError:actionError} = useGetAdminActionRecordsQuery();
const actions = actionData?.data;
const expiringRecently = actions?.expiringMemberships;
const pendingPurchase = actions?.pendingPurchases;

const {data:revenueData} = useGetTotalRevenueQuery()
const revenue = revenueData?.data;



  return (
    <div className="space-y-8">
      {/* KPI row */}
      {kpiQuery.isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
      )}
      {kpiQuery.isError && <ErrorState onRetry={kpiQuery.refetch} />}
      {kpiQuery.data && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          
          <DashboardCard label={"Total Revenue"} value={`  ৳ ${revenue?.totalRevenue}`} state={revenue?.revenueChangeType} line={true} />

          <DashboardCard label={"This Months Revenue"} value={`  ৳ ${revenue?.thisMonthRevenue}`} state={revenue?.revenueChangeType} grow={revenue?.revenueChange} line={true} />

          <DashboardCard label={"Previous Months Revenue"} value={`  ৳ ${revenue?.previousMonthRevenue}`} line={true}  />

          <DashboardCard label={"Total Membership"} value={` ${revenue?.totalMemberships}`}  />

          <DashboardCard label={"Membership Expiring Soon"} value={` ${expiringRecently?.count}`}  />

          <DashboardCard label={"Purchase to accept"} value={` ${pendingPurchase?.count}`} />

        </div>
      )}

      {/* Revenue + plan distribution */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">

        {/* revenue graph  */}

        <FlatCard className="p-5 sm:p-7">
  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
    <div>
      <h2 className="font-body text-lg font-bold normal-case text-white">
        Revenue Comparison
      </h2>
      <p className="mt-1 text-xs text-ink-muted">
        Previous month vs current month
      </p>
    </div>

    <div className="flex items-center gap-4 text-xs">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#F56A1F]" />
        <span className="text-ink-muted">Monthly Revenue</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="text-ink-muted">Total Revenue</span>
      </div>
    </div>
  </div>

  {actionLoadin ? (
    <Skeleton className="h-64 w-full" />
  ) : actionError ? (
    <ErrorState onRetry={revenueQuery.refetch} />
  ) : (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={[
            {
              label: "Previous Month",
              revenue: revenue?.previousMonthRevenue || 0,
              totalRevenue: revenue?.totalRevenue || 0,
            },
            {
              label: "Current Month",
              revenue: revenue?.thisMonthRevenue || 0,
              totalRevenue: revenue?.totalRevenue || 0,
            },
          ]}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            stroke="#B8ADA6"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#B8ADA6"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              value >= 1000
                ? `৳${Math.round(value / 1000)}k`
                : `৳${value}`
            }
          />

          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;

              return (
                <div className="rounded-xl border border-white/10 bg-[#1d1512] px-4 py-3 shadow-xl">
                  <p className="mb-2 text-xs font-semibold text-white">
                    {label}
                  </p>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-6">
                      <span className="text-xs text-[#B8ADA6]">
                        Monthly Revenue
                      </span>

                      <span className="text-xs font-semibold text-[#F56A1F]">
                        ৳
                        {Number(
                          payload.find(
                            (item) => item.dataKey === "revenue"
                          )?.value || 0
                        ).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-6">
                      <span className="text-xs text-[#B8ADA6]">
                        Total Revenue
                      </span>

                      <span className="text-xs font-semibold text-white">
                        ৳
                        {Number(
                          payload.find(
                            (item) => item.dataKey === "totalRevenue"
                          )?.value || 0
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }}
          />

          {/* Previous / Current month revenue */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#F56A1F"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#F56A1F",
              stroke: "#1d1512",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 7,
            }}
          />

          {/* Total revenue reference */}
          <Line
            type="monotone"
            dataKey="totalRevenue"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={1.5}
            strokeDasharray="6 6"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )}
        </FlatCard>

        {/* pie chart  */}

        <FlatCard className="p-5 sm:p-7">
  <h2 className="mb-4 font-body text-lg font-bold normal-case text-white">
    Revenue Distribution
  </h2>

  {actionLoadin ? (
    <Skeleton className="h-64 w-full" />
  ) : actionError ? (
    <ErrorState onRetry={revenueQuery.refetch} />
  ) : (
    <>
      {(() => {
        const revenueData = [
          {
            name: "Total Revenue",
            value: revenue?.totalRevenue || 0,
            color: "#F56A1F",
          },
          {
            name: "Current Month",
            value: revenue?.thisMonthRevenue || 0,
            color: "#FF8A4C",
          },
          {
            name: "Previous Month",
            value: revenue?.previousMonthRevenue || 0,
            color: "#8B7E78",
          },
        ];

        return (
          <>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {revenueData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                        stroke="none"
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `৳${Number(value).toLocaleString()}`
                    }
                    contentStyle={{
                      background: "#211714",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{
    color: "#ffffff",
  }}
  itemStyle={{
    color: "#ffffff",
  }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <ul className="mt-4 space-y-2">
              {revenueData.map((d) => (
                <li
                  key={d.name}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2 text-ink-muted">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    {d.name}
                  </span>

                  <span className="font-semibold text-white">
                    ৳{Number(d.value).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </>
        );
      })()}
    </>
  )}
</FlatCard>

      </div>

      {/* Activity feed + expiring alert */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">

       {/* pending  */}

        <Link to="/admin/purchase?status=pending">
       <FlatCard className="p-5 sm:p-7">
  {/* Header */}
  <div className="mb-5 flex items-center justify-between">
    <h2 className="font-body text-lg font-bold normal-case text-white">
      Pending Purchase Requests
    </h2>

    <Badge tone="orange">
      {pendingPurchase?.count || 0} requests
    </Badge>
  </div>

  {/* Scrollable List */}
  <div className="h-[320px] space-y-3 overflow-y-auto gym-scrollbar pr-2">
    {pendingPurchase?.records?.length > 0 ? (
      pendingPurchase.records.map((purchase) => (
        <div
          key={purchase._id}
          className="rounded-xl border border-white/10 bg-base p-4 transition hover:border-accent/30"
        >
          {/* Top Row */}
          <div className="flex items-start justify-between gap-4">
            {/* Member */}
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                Member
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-white">
                {purchase.user?.fullName || "Unknown User"}
              </p>

              <p className="mt-0.5 truncate text-xs text-ink-muted">
                @{purchase.user?.userName || "N/A"}
              </p>
            </div>

            {/* Status + Requested At */}
            <div className="flex shrink-0 flex-col items-end gap-2">
              <Badge tone="orange">
                {purchase.status || "pending"}
              </Badge>

              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wide text-ink-muted">
                  Requested
                </p>

                <p className="mt-0.5 text-xs font-medium text-white">
                  {purchase.requestedAt
                    ? new Date(
                        purchase.requestedAt
                      ).toLocaleDateString("en-BD", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Purchase Details */}
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-3">
            {/* Plan */}
            <div>
              <p className="text-[10px] uppercase tracking-wide text-ink-muted">
                Plan
              </p>

              <p className="mt-1 truncate text-xs font-semibold text-white">
                {purchase.plan?.name || "Unknown Plan"}
              </p>
            </div>

            {/* Amount */}
            <div>
              <p className="text-[10px] uppercase tracking-wide text-ink-muted">
                Amount
              </p>

              <p className="mt-1 text-xs font-bold text-accent">
                ৳{purchase.plan?.totalCharge?.toLocaleString() || "0"}
              </p>
            </div>

            {/* Phone */}
            <div>
              <p className="text-[10px] uppercase tracking-wide text-ink-muted">
                Phone
              </p>

              <p className="mt-1 truncate text-xs font-medium text-white">
                {purchase.user?.phone || "N/A"}
              </p>
            </div>

            {/* Email */}
            <div>
              <p className="text-[10px] uppercase tracking-wide text-ink-muted">
                Email
              </p>

              <p className="mt-1 truncate text-xs font-medium text-white">
                {purchase.user?.email || "N/A"}
              </p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="flex h-full items-center justify-center rounded-xl border border-white/10 bg-base">
        <p className="text-sm text-ink-muted">
          No pending purchase requests
        </p>
      </div>
    )}
  </div>
       </FlatCard>
        </Link>


{/* expiring  */}

        <FlatCard className="border-accent/30 p-5 sm:p-7">
  {/* Header */}
  <div className="mb-5 flex items-center justify-between">
    <h2 className="font-body text-lg font-bold normal-case text-white">
      Expiring Soon
    </h2>

    <Badge tone="orange">
      {expiringRecently?.count} members
    </Badge>
  </div>

  {/* Scrollable List */}
  <div className="max-h-[320px] space-y-3 overflow-y-auto gym-scrollbar pr-1">
    {expiringRecently?.records?.length > 0 ? (
      expiringRecently?.records?.map((m) => (
        <div
          key={m._id}
          className="rounded-xl border border-white/10 bg-base p-3"
        >
          {/* Top */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Member : {m.user?.fullName || "Unknown User"}
              </p>

              <p className="mt-0.5 truncate text-xs text-ink-muted">
               Plan : {m.plan?.name || "Unknown Plan"}
              </p>
            </div>

            <Badge tone="orange">
              {m.daysLeft}d left
            </Badge>
          </div>

          {/* Member Info */}
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-ink-muted">
                Card
              </p>

              <p className="mt-0.5 truncate text-xs font-medium text-white">
                {m.cardNumber || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wide text-ink-muted">
                Expires
              </p>

              <p className="mt-0.5 text-xs font-medium text-white">
                {m.endDate
                  ? new Date(m.endDate).toLocaleDateString("en-BD", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wide text-ink-muted">
                Phone
              </p>

              <p className="mt-0.5 truncate text-xs font-medium text-white">
                {m.user?.phone || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wide text-ink-muted">
                Status
              </p>

              <p className="mt-0.5 text-xs font-medium capitalize text-white">
                {m.status || "N/A"}
              </p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="flex h-40 items-center justify-center rounded-xl border border-white/10 bg-base">
        <p className="text-sm text-ink-muted">
          No memberships expiring soon
        </p>
      </div>
    )}
  </div>
        </FlatCard>


      </div>
    </div>
  )
}
