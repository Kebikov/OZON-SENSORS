interface Isubtitle {
    id: number;
    text: string;
}

export interface IItemSensors {
    type: string;
    title: string;
    subtitle: Isubtitle[];
    img: number;
}

export interface ISensors {
    [key: string]: IItemSensors 
}

export type TKeySensor = keyof ISensors;

export const SENSORS: ISensors = {
    1: {
        type: 'Дымовой извещатель',
        title: 'АБК-1 (1-этаж)',
        subtitle: [
            {
                id: 1,
                text: 'вестибюль (пост охраны №1)'
            }, 
            {
                id: 2,
                text: 'комната охраны'
            }
        ],
        img: require('@/source/imgPlan/1.jpg')
    },
    2: {
        type: 'Дымовой извещатель',
        title: 'АБК-1 (склад 1-этаж)',
        subtitle: [
            {
                id: 1,
                text: 'каб.106, каб.107А'
            }, 
            {
                id: 2,
                text: 'тех.помещение №112 у поста №3'
            }, 
            {
                id: 3,
                text: 'вестибюль (лестн. клетка №2)'
            }, 
            {
                id: 4,
                text: 'лестн. клетка №2'
            }
        ],
        img: require('@/source/imgPlan/2.jpg')
    }
}

