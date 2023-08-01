export interface CommonState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}
