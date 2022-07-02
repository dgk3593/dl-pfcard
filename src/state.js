import create from "zustand";
import { DEFAULT_ID } from "./const";
import { fetchData } from "./helper";
import produce from "immer";

const immer = config => (set, get, api) =>
    config(fn => set(produce(fn)), get, api);

const appConfig = set => ({
    background: "001",
    setBackground: value =>
        set(state => {
            state.background = value;
        }),

    chara: {
        id: "",
        setId: async newId => {
            const data = await fetchData(newId);
            set(state => {
                state.chara.data = data;
                state.chara.face = data.faceList?.[0];
                state.chara.mouth = data.mouthList?.[0];
                state.chara.face2 = data.face2List?.[0];
                state.chara.mouth2 = data.mouth2List?.[0];
                state.chara.id = newId;
            });
        },
        data: {},
        face: undefined,
        mouth: undefined,
        face2: undefined,
        mouth2: undefined,
        setPart: (part, value) =>
            set(state => {
                state.chara[part] = value;
            }),
    },

    style: "001",
    setStyle: value =>
        set(state => {
            state.style = value;
        }),

    text: {
        name: "",
        level: "",
        id: "",
        goal: "",
        comment: "",
    },
    setText: (field, value) => {
        set(state => {
            state.text[field] = value;
        });
    },
});

export const useAppState = create(immer(appConfig));
useAppState.getState().chara.setId(DEFAULT_ID);
