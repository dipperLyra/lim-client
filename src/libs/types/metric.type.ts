export interface MetricType {
  name: string;
  type?: Type;
  symbol: string;
}

enum Type {
  Volume = "volume",
  Weight = "weight",
}
