export interface MetricType {
  id?: number;
  name: string;
  type?: Type;
  symbol: string;
}

enum Type {
  Volume = "volume",
  Weight = "weight",
}
