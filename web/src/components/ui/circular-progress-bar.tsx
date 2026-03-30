interface CircularProgressBarProps {
  circleColor?: string
  progress: number
  progressColor?: string
  size?: number
  strokeWidth?: number
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  circleColor = "text-zinc-800",
  progressColor = "text-indigo-500",
}) => {
  const center = size / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const progressOffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="h-full w-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <title>Circular progress bar</title>

        <circle
          className={`${circleColor} stroke-current`}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
        <circle
          className={`${progressColor} stroke-current`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: progressOffset,
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
        />
      </svg>
      <div
        className={
          "absolute inset-0 flex items-center justify-center font-medium text-xs text-zinc-50"
        }
      >
        {progress}
        <span className="text-xxs text-zinc-400">%</span>
      </div>
    </div>
  )
}
