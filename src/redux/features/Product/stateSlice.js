const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    search: "",
    view: 'grid',
};

const filterSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        toggleView: (state, action) => {
            state.view = action.payload
        },
    },
});

export const { setSearch, toggleView } = filterSlice.actions;
export default filterSlice.reducer;
