export const DRAWING_STATES = {
	EMPTY: "state-empty", // Nothing on map
	DRAFTING: "state-drafting", // Fewer than 3 points
	DRAWING: "state-drawing", // 3 or more points
	VIEWING: "state-viewing" // Observing polygon
}

export const MAPBOX_MODES = {

	// Lets you select, delete and drag features.
	// In this mode, features can have their active state changed by the user. To control what is active, react to changes as described in the events section below.
	// Draw will transition into simple_select mode every time a single feature has completed drawing.
	SIMPLE_SELECT: "simple_select",

	// Lets you select, delete and drag vertices.
	// direct_select mode doesn't handle point features.
	DIRECT_SELECT: 'direct_select',

	// Lets you draw a LineString feature.
	DRAW_LINE_STRING: 'draw_line_string',

	// Lets you draw a Polygon feature.
	DRAW_POLYGON: 'draw_polygon',

	// Lets you draw a Point feature.
	DRAW_POINT: 'draw_point',

	// Disables editing for all drawn features. It does not take an options argument.
	// Note that this mode can only be entered or exited via .changeMode
	STATIC: 'static'
}
