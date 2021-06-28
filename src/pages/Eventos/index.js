import React, {
  useReducer,
  useCallback,
  useEffect,
  useContext,
  useState,
} from "react";
import { Paper, LinearProgress } from "@material-ui/core";
import { withStyles, styled } from "@material-ui/core/styles";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  WeekView,
  DayView,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import UserContext from "../../contexts/User/UserContext";
import AlertsContext from "../../contexts/Alerts/AlertsContext";

import {
  getEventos,
  novoEvento,
  deleteEvento,
  atualizaEvento,
} from "./services";

const styles = {
  toolbarRoot: {
    position: "relative",
  },
  progress: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
  },
};

const initialState = {
  data: [],
  loading: false,
  currentDate: new Date(),
  currentViewName: "Month",
};

const resourcesData = [
  {
    text: "Geral",
    id: "geral",
    color: "#96FADA",
  },
  {
    text: "Ligantes",
    id: "ligantes",
    color: "#85D5DE",
  },
  {
    text: "Diretoria",
    id: "diretoria",
    color: "#A0CAF5",
  },
];
const resources = [
  {
    fieldName: "grupo",
    title: "Grupo",
    instances: resourcesData,
  },
];

const ToolbarWithLoading = withStyles(styles, { name: "Toolbar" })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  )
);

const mapEventos = (evento) => ({
  id: evento.eventosID,
  startDate: +new Date(evento.data_inicio),
  endDate: +new Date(evento.data_fim),
  title: evento.nome,
  grupo: evento.grupo,
  notes: evento.descricao,
  allDay: evento.all_day,
});

const reducer = (state, action) => {
  switch (action.type) {
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setData":
      return { ...state, data: action.payload.map(mapEventos) };
    case "setCurrentViewName":
      return { ...state, currentViewName: action.payload };
    case "setCurrentDate":
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};

const MyPaper = styled(Paper)({ borderRadius: 5, borderColor: "#f1b9e1" });

function Eventos() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, currentViewName, currentDate } = state;
  const { token, groups, checkExpire } = useContext(UserContext);
  const { setOpenAlert, setMessage } = useContext(AlertsContext);

  const [readonly, setReadonly] = useState(true);
  const setCurrentViewName = useCallback(
    (nextViewName) =>
      dispatch({
        type: "setCurrentViewName",
        payload: nextViewName,
      }),
    [dispatch]
  );
  const setData = useCallback(
    (nextData) =>
      dispatch({
        type: "setData",
        payload: nextData,
      }),
    [dispatch]
  );
  const setCurrentDate = useCallback(
    (nextDate) =>
      dispatch({
        type: "setCurrentDate",
        payload: nextDate,
      }),
    [dispatch]
  );
  const setLoading = useCallback(
    (nextLoading) =>
      dispatch({
        type: "setLoading",
        payload: nextLoading,
      }),
    [dispatch]
  );

  function commitChanges({ added, changed, deleted }) {
    if (added) {
      novoEvento(added, setData, setLoading, token, setOpenAlert, setMessage);
    }
    if (changed) {
      var eventoID = Object.keys(changed)[0];
      var dados = Object.values(changed)[0];
      atualizaEvento(
        eventoID,
        dados,
        setData,
        setLoading,
        token,
        setOpenAlert,
        setMessage
      );
    }
    if (deleted !== undefined) {
      deleteEvento(
        deleted,
        setData,
        setLoading,
        token,
        setOpenAlert,
        setMessage
      );
    }
    return true;
  }

  useEffect(() => {
    checkExpire();
    getEventos(setData, setLoading, token, setOpenAlert, setMessage);
  }, [setData, currentViewName, currentDate]);

  useEffect(() => {
    if (groups) {
      if (groups.includes("diretoria")) {
        setReadonly(false);
      }
    }
  }, [groups]);

  return (
    <MyPaper>
      <Scheduler data={data} height="auto" locale="pt-BR">
        <ViewState
          currentDate={currentDate}
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <DayView displayName="Dia" />
        <WeekView displayName="Semana" />
        <MonthView displayName="Mês" />
        <AllDayPanel
          messages={{
            allDay: "Dia Todo",
          }}
        />
        <Appointments />
        <Resources data={resources} mainResourceName="grupo" />
        <Toolbar
          {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
        />
        <DateNavigator />
        <TodayButton messages={{ today: "Hoje" }} />
        <ViewSwitcher />
        <AppointmentTooltip showOpenButton showCloseButton />
        <AppointmentForm
          readOnly={readonly}
          messages={{
            detailsLabel: "Detalhes",
            titleLabel: "Nome",
            moreInformationLabel: "Descrição",
            notesLabel: "Descrição do Evento",
            allDayLabel: "Dia Todo",
            repeatLabel: "Repetir",
            commitCommand: "Salvar",
          }}
        />
      </Scheduler>
    </MyPaper>
  );
}

export default Eventos;
