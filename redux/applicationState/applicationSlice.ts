import { createSlice } from '@reduxjs/toolkit'
import { ApplicationStateSlice } from '../../interfaces/ApplicationState'

const initialState: ApplicationStateSlice = {
    loading: false,
    error: false,
}

interface SetLoadingPayload {
    payload: boolean,
    type: any
}

interface SetErrorPayload {
    payload: string | boolean,
    type: any
}

export const applicationSlice = createSlice({
    name: 'applicationState',
    initialState,
    reducers: {
        setLoading: (state, { payload, type}: SetLoadingPayload) => {
            state.loading = payload;
        },
        setError: (state, { payload, type}: SetErrorPayload) => {
            state.error = payload;
        },
        clearState: (state) => {
            state.error = false;
            state.loading = false;
        },
    }
})

export const { setLoading, setError, clearState } = applicationSlice.actions;

export default applicationSlice.reducer;