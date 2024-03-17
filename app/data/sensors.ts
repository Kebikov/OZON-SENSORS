export interface IItemSensors {
    type: string;
    title: string;
    subtitle: string[];
    img: number;
}

export interface ISensors {
    [key: string]: IItemSensors 
}

export type TKeySensor = keyof ISensors;

export const SENSORS: ISensors = {
    1: {
        type: 'Дымовой извещатель',
        title: 'АБК-1 ( 1-этаж )',
        subtitle: ['вестибюль (пост охраны №1)', 'комната охраны'],
        img: require('@/source/imgPlan/1.jpg')
    }
}

