interface Isubtitle {
    text: string;
}

type TSensor = 'Дымовой извещатель' | 'Ручной извещатель';

export interface IItemSensors {
    type: TSensor;
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
                text: 'вестибюль (пост охраны №1)'
            }, 
            {
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
                text: 'каб.106, каб.107А'
            }, 
            {
                text: 'тех.помещение №112 у поста №3'
            }, 
            {
                text: 'вестибюль (лестн. клетка №2)'
            }, 
            {
                text: 'лестн. клетка №2'
            }
        ],
        img: require('@/source/imgPlan/2.jpg')
    },
    3: {
        type: 'Ручной извещатель',
        title: 'АБК-1 (1-этаж)',
        subtitle: [
            {
                text: 'вестибюль (пост №1)'
            }, 
            {
                text: 'лестн. клетка №1'
            }, 
            {
                text: 'вестибюль (лестн. клетка №2)'
            }, 
            {
                text: 'лестн. клетка №2'
            }
        ],
        img: require('@/source/imgPlan/3.jpg')
    },
    4: {
        type: 'Ручной извещатель',
        title: 'Cклад  (1-этаж)',
        subtitle: [
            {
                text: 'пост №3 (у выхода)'
            }, 
            {
                text: 'склад со стороны ворот №16 - 26'
            }
        ],
        img: require('@/source/imgPlan/4.jpg')
    },
    5: {
        type: 'Ручной извещатель',
        title: 'Cклад  (1-этаж)',
        subtitle: [
            {
                text: 'стеллаж мезонина 5,6 от ворот № 16-26 (перпендикулярно выходу «D», выход «D»)'
            }
        ],
        img: require('@/source/imgPlan/5.jpg')
    },
    6: {
        type: 'Дымовой извещатель',
        title: 'Cклад  (1-этаж)',
        subtitle: [
            {
                text: 'тех.помещение №120 (у ворот №21)'
            },
            {
                text: 'тех.помещение №137 (у ворот №21)'
            }
        ],
        img: require('@/source/imgPlan/6.jpg')
    },
    7: {
        type: 'Дымовой извещатель',
        title: 'АБК 2 (1-этаж)',
        subtitle: [
            {
                text: 'вестибюль'
            },
            {
                text: 'диспетчерская (документооборот)'
            }
        ],
        img: require('@/source/imgPlan/7.jpg')
    },
    8: {
        type: 'Дымовой извещатель',
        title: 'АБК 2 (1-этаж)',
        subtitle: [
            {
                text: 'электрощитовая (вход справа от входа в вестибюль АБК 2)'
            }
        ],
        img: require('@/source/imgPlan/8.jpg')
    },
    9: {
        type: 'Ручной извещатель',
        title: 'АБК 2 (1-этаж)',
        subtitle: [
            {
                text: 'вестибюль'
            }
        ],
        img: require('@/source/imgPlan/9.jpg')
    },
    10: {
        type: 'Ручной извещатель',
        title: 'АБК 2 (1-этаж)',
        subtitle: [
            {
                text: 'электрощитовая (вход справа от входа в вестибюль АБК 2)'
            },
            {
                text: 'насосная станция пожаротушения'
            }
        ],
        img: require('@/source/imgPlan/10.jpg')
    },
    11: {
        type: 'Ручной извещатель',
        title: 'Cклад  (1-этаж)',
        subtitle: [
            {
                text: 'центральная часть мезонина перпендикулярно выходу «С»'
            }
        ],
        img: require('@/source/imgPlan/11.jpg')
    },
    12: {
        type: 'Ручной извещатель',
        title: 'Cклад  (1-этаж)',
        subtitle: [
            {
                text: 'от склада АХО и вдоль ворот № 39-28'
            }
        ],
        img: require('@/source/imgPlan/12.jpg')
    },
    13: {
        type: 'Дымовой извещатель',
        title: 'АБК 1 (2-этаж)',
        subtitle: [
            {
                text: 'мужск.гардероб (2-ой этаж)'
            }
        ],
        img: require('@/source/imgPlan/13.jpg')
    },
    14: {
        type: 'Дымовой извещатель',
        title: 'АБК 1 (2-этаж)',
        subtitle: [
            {
                text: 'женск. гардероб'
            },
            {
                text: 'серверная (у выхода на лестн. клетку №2)'
            }
        ],
        img: require('@/source/imgPlan/14.jpg')
    },
    15: {
        type: 'Ручной извещатель',
        title: 'АБК 1 (2-этаж)',
        subtitle: [
            {
                text: 'мужск.гардероб (у входа)'
            },
            {
                text: 'женск.гардероб (у входа)'
            }
        ],
        img: require('@/source/imgPlan/15.jpg')
    },
    16: {
        type: 'Дымовой извещатель',
        title: 'АБК 2 (2-этаж)',
        subtitle: [
            {
                text: 'коридор'
            },
            {
                text: 'гардероб'
            }
        ],
        img: require('@/source/imgPlan/16.jpg')
    },
    17: {
        type: 'Ручной извещатель',
        title: 'АБК 2 (2-этаж)',
        subtitle: [
            {
                text: 'коридор'
            }
        ],
        img: require('@/source/imgPlan/17.jpg')
    },
    18: {
        type: 'Дымовой извещатель',
        title: 'АБК 2 (2-этаж)',
        subtitle: [
            {
                text: 'все кабинеты 2-го этажа'
            }
        ],
        img: require('@/source/imgPlan/18.jpg')
    },
    19: {
        type: 'Дымовой извещатель',
        title: 'АБК 1 (3-этаж)',
        subtitle: [
            {
                text: 'коридор у выхода на лестн.клетку №1'
            },
            {
                text: 'столовая'
            }
        ],
        img: require('@/source/imgPlan/19.jpg')
    },
    20: {
        type: 'Дымовой извещатель',
        title: 'АБК 1 (3-этаж)',
        subtitle: [
            {
                text: 'коридор у каб. 303-307'
            },
            {
                text: 'каб. №303, 306, 307'
            }
        ],
        img: require('@/source/imgPlan/20.jpg')
    },
    21: {
        type: 'Ручной извещатель',
        title: 'АБК 1 (3-этаж)',
        subtitle: [
            {
                text: 'у выхода на лестн.клетку №1'
            },
            {
                text: 'у выхода на лестн.клетку №2'
            },
            {
                text: 'балкон над воротами № 16-26'
            }
        ],
        img: require('@/source/imgPlan/21.jpg')
    },
    22: {
        type: 'Ручной извещатель',
        title: 'АБК 2 (балкон)',
        subtitle: [
            {
                text: 'балкон над воротами №39-28'
            }
        ],
        img: require('@/source/imgPlan/22.jpg')
    },
    23: {
        type: 'Дымовой извещатель',
        title: 'АБК 1 (4-этаж)',
        subtitle: [
            {
                text: 'каб. №401'
            },
            {
                text: 'каб. №408'
            },
            {
                text: 'коридор'
            }
        ],
        img: require('@/source/imgPlan/23.jpg')
    },
    24: {
        type: 'Ручной извещатель',
        title: 'АБК 1 (4-этаж)',
        subtitle: [
            {
                text: 'коридор'
            }
        ],
        img: require('@/source/imgPlan/24.jpg')
    },
    25: {
        type: 'Дымовой извещатель',
        title: 'АБК 1 (4-этаж)',
        subtitle: [
            {
                text: 'каб. №405'
            },
            {
                text: 'каб. №406'
            },
            {
                text: 'каб. №407'
            },
        ],
        img: require('@/source/imgPlan/25.jpg')
    },
    26: {
        type: 'Дымовой извещатель',
        title: 'Cклад  (1-этаж)',
        subtitle: [
            {
                text: 'электрощитовая'
            }
        ],
        img: require('@/source/imgPlan/26.jpg')
    },
}

