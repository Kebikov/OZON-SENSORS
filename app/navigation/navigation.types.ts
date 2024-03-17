import { ComponentType } from "react";
import { RouteProp } from "@react-navigation/native";

export type TypeRootPage = {
    Home: undefined;
    Sensors: {
        numberSensor: number;
    };
};

export interface IRoute {
    name: keyof TypeRootPage;
    component: ComponentType;
}

export type SensorPropse = {
    route: RouteProp<TypeRootPage, 'Sensors'>
}