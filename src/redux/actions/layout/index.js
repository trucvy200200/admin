// ** Handles Layout Content Width (full / boxed)
export const handleContentWidth = value => dispatch => dispatch({ type: 'HANDLE_CONTENT_WIDTH', value })

// ** Handles Menu Collapsed State (Bool)
export const handleMenuCollapsed = value => dispatch => dispatch({ type: 'HANDLE_MENU_COLLAPSED', value })

// ** Handles Menu Hidden State (Bool)
export const handleMenuHidden = value => dispatch => dispatch({ type: 'HANDLE_MENU_HIDDEN', value })

// ** Handles RTL (Bool)
export const handleRTL = value => dispatch => dispatch({ type: 'HANDLE_RTL', value })

// ** Handles Last Layout (Bool)
export const handleLastLayout = value => dispatch => dispatch({ type: 'HANDLE_LAST_LAYOUT', value })

// ** Handles Layout (Bool)
export const handleLayout = value => dispatch => dispatch({ type: 'HANDLE_LAYOUT', value })

// ** Handles Skin (Bool)
export const handleSkin = value => dispatch => dispatch({ type: 'HANDLE_SKIN', value })

// ** Handles Navbar Color (Bool)
export const handleNavbarColor = value => dispatch => dispatch({ type: 'HANDLE_NAVBAR_COLOR', value })

// ** Handles Footer Type (Bool)
export const handleFooterType = value => dispatch => dispatch({ type: 'HANDLE_FOOTER_TYPE', value })

// ** Handles Navbar Type (Bool)
export const handleNavbarType = value => dispatch => dispatch({ type: 'HANDLE_NAVBAR_TYPE', value })
