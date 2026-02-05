export function PresentationSlide({ current, masterSvgText, schemesOverride }) {
  return (
    <div className="ppt">
      <div className="pptCanvas">
        {current.kind === "master" && (
          <div className="pptSvgOnly" dangerouslySetInnerHTML={{ __html: masterSvgText }} />
        )}

        {current.kind === "blockFloor" && (
          <FloorPlan
            blockId={current.blockId}
            floor={current.floor}
            schemesOverride={schemesOverride}
            occupiedIds={collectOccupiedIds(current.blockId, current.floor)}
            operatorEnabled={false}
            onApartmentClick={() => {}}
          />
        )}
      </div>

      <div className="pptHud">
        <div className="pptTitle">
          {current.kind === "master" ? "Схема 11 блоков" : current.title}
        </div>
        <div className="pptHint">←/→ или Space • Esc выйти</div>
      </div>
    </div>
  );
}

export function collectOccupiedIds(blockId, floor) {
  const map = JSON.parse(localStorage.getItem("apt_presentation_occupancy_v1") || "{}");
  const occupiedIds = [];
  const prefix = `${blockId}|${floor}|`;
  for (const k of Object.keys(map)) {
    if (k.startsWith(prefix)) occupiedIds.push(k.slice(prefix.length));
  }
  return occupiedIds;
}
