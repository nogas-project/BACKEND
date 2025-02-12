// Gas analog sensor data, with a unix timestamp added in the service layer
export interface Gas {
    id: number,
    co2_amount: number;
    timestamp: number;
}