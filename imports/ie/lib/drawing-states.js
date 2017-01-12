export const DRAWING_STATES = {
	EMPTY: "state-empty", // Nothing on map
	DRAFTING: "state-drafting", // Fewer than 3 points
	DRAWING: "state-drawing", // 3 or more points
	VIEWING: "state-viewing", // Observing polygon
	SWITCHING: "state-switching" // User selected existing polygon and Mapbox must rerender with currentPolygon
}
