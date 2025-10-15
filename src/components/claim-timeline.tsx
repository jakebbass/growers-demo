interface ClaimTimelineProps {
  status: 'submitted' | 'review' | 'approved' | 'rejected';
}

const steps: ClaimTimelineProps['status'][] = ['submitted', 'review', 'approved'];

const labels: Record<ClaimTimelineProps['status'], string> = {
  submitted: 'Submitted',
  review: 'In review',
  approved: 'Approved',
  rejected: 'Rejected'
};

export function ClaimTimeline({ status }: ClaimTimelineProps) {
  return (
    <ol className="space-y-3">
      {steps.map((step, index) => {
        const completed = steps.indexOf(status) >= index || status === 'approved';
        const isCurrent = step === status;
        return (
          <li key={step} className="flex items-start gap-3">
            <span
              className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                completed ? 'bg-brand text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">{labels[step]}</p>
              {isCurrent ? (
                <p className="text-xs text-slate-500">Typical review time: 3–5 days.</p>
              ) : null}
            </div>
          </li>
        );
      })}
      {status === 'rejected' ? (
        <li className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-xs font-semibold text-white">
            !
          </span>
          <div>
            <p className="text-sm font-semibold text-rose-600">Rejected</p>
            <p className="text-xs text-rose-500">Your agent will reach out with next steps.</p>
          </div>
        </li>
      ) : null}
    </ol>
  );
}
