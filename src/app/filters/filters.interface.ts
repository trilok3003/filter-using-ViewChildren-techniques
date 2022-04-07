export interface Filter {
  id : string|string;
  title : string;
  active? : boolean;
}

export interface ActiveFilter {
  id : number|string;
  group : string;
}