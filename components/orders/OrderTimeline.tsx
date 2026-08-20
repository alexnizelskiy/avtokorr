import { orderStages, orderStageLabels, stageIndex, type OrderStage } from "@/lib/order-labels";

interface EventLike {
  id: string;
  stage: string;
  comment: string | null;
  createdAt: Date;
}

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
  }).format(d);
}

export function OrderTimeline({ stage, events }: { stage: OrderStage; events: EventLike[] }) {
  const currentIdx = stageIndex(stage);
  return (
    <div className="order-steps">
      {orderStages.map((s, i) => {
        const state = i < currentIdx ? "done" : i === currentIdx ? "cur" : "todo";
        const stageEvents = events.filter((e) => e.stage === s);
        return (
          <div key={s} className={`ostep ${state}`}>
            <div className="mk">{state === "done" ? "✓" : i + 1}</div>
            <div className="ostep-body">
              <div className="nm">{orderStageLabels[s]}</div>
              {stageEvents.map((e) => (
                <div key={e.id} className="oevent">
                  <span className="num dt">{fmtDate(e.createdAt)}</span>
                  {e.comment ? <span className="cm"> · {e.comment}</span> : null}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
