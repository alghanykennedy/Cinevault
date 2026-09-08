export interface SectionState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}