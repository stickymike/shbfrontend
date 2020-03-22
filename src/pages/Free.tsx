import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  Reducer
} from "react";

import NewPaper from "../components/NewPaper";
import TextField from "@material-ui/core/TextField";
import useKeyPress from "../helpers/hooks/useKeyPress";
import getWidthOfText from "../helpers/widthoftext";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import useMenuProps from "./useMenuProps";

import produce, { Draft } from "immer";
import { v4 as uuidv4 } from "uuid";
import { number } from "yup";
import TaskComp from "./TaskComp";
import { useQuery } from "@apollo/client";
import { GET_TASKGROUPS } from "../gql/queries/tasksQuery";

type tasks = {
  id: string;
  value: string;
  width: string;
  tasks?: tasks[];
};

type megaTasks = {
  value: string;
  id: string;
  tasks?: tasks[];
};

type AppState = {
  focus: {
    id: null | string;
    loc: (number | string)[];
  };
  megaState: megaTasks[];
};

type Action =
  | { type: "SETMEGA"; payload: string }
  | { type: "SET_TWO"; payload: number };

const getValue = (data: any, path: (string | number)[]) => {
  var i,
    len = path.length;
  for (i = 0; typeof data === "object" && i < len; ++i) {
    data = data[path[i]];
  }
  // if (data instanceof Array) return [...data];
  return data;
};

const reducer: Reducer<AppState, Action> = produce(
  (draftState: Draft<AppState>, action: Action) => {
    switch (action.payload) {
      case "SETMEGA": {
        if (draftState.focus.id) {
          if (getValue(draftState, draftState.focus.loc))
            getValue(draftState, draftState.focus.loc).value = action.payload;
        }
        break;
      }
    }
  }
);

// const reducer = (state: AppState, action: Action): AppState => {
//   switch (action.payload) {
//     case "SETMEGA": {
//     }
//   }
// };

const Free: React.FC = () => {
  const [megaState, setMegaState] = useState<megaTasks[]>([
    {
      value: "First List",
      id: uuidv4(),
      tasks: [
        {
          id: uuidv4(),
          value: "",
          width: "10px",
          tasks: [
            {
              id: uuidv4(),
              value: "",
              width: "10px"
            }
          ]
        },
        {
          id: uuidv4(),
          value: "",
          width: "10px"
        }
      ]
    },
    {
      value: "Second List",
      id: uuidv4(),
      tasks: [
        {
          id: uuidv4(),
          value: "",
          width: "10px",
          tasks: [
            {
              id: uuidv4(),
              value: "No Hombre",
              width: "10px"
            },
            {
              id: uuidv4(),
              value: "Move me",
              width: "10px"
            },
            {
              id: uuidv4(),
              value: "asdfa",
              width: "10px"
            }
          ]
        },
        {
          id: uuidv4(),
          value: "Who Dat",
          width: "10px"
        }
      ]
    },
    {
      value: "Third List",
      id: uuidv4(),
      tasks: [
        {
          id: uuidv4(),
          value: "",
          width: "10px",
          tasks: [
            {
              id: uuidv4(),
              value: "Hombre",
              width: "10px",
              tasks: [
                {
                  id: uuidv4(),
                  value: "l",
                  width: "10px"
                },
                {
                  id: uuidv4(),
                  value: "p",
                  width: "10px",
                  tasks: [
                    {
                      id: uuidv4(),
                      value: "l",
                      width: "10px"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: uuidv4(),
          value: "Who Dat",
          width: "10px"
        }
      ]
    }
  ]);

  const myRef = useRef<HTMLElement>(null!);

  const [focus, setFocus] = useState<{
    id: null | string;
    loc: (number | string)[];
  }>({ id: null, loc: [] });

  const controlPressed = useKeyPress("Control", () => {});
  const bracketEndPressed = useKeyPress("]", () => {});
  const bracketStartPressed = useKeyPress("[", () => {});

  const { data } = useQuery(GET_TASKGROUPS);
  console.log(data);

  // const getValue = (data: any, path: (string | number)[]) => {
  //   var i,
  //     len = path.length;
  //   for (i = 0; typeof data === "object" && i < len; ++i) {
  //     data = data[path[i]];
  //   }
  //   // if (data instanceof Array) return [...data];
  //   return data;
  // };

  useEffect(() => {
    if (controlPressed && bracketEndPressed && focus.id) {
      if (focus.loc.slice(-1).toString() !== "0") {
        const newState = produce(megaState, draft => {
          const loc = [...focus.loc];
          const length = loc.length;
          const lastIndex = Number(loc.splice(-1));
          let removed: any;
          if (length > 1) {
            [removed] = getValue(draft, loc.slice(0, length! - 2)).tasks.splice(
              lastIndex,
              1
            );
            loc.push((lastIndex - 1).toString());

            if (typeof getValue(draft, loc).tasks === "undefined")
              getValue(draft, loc).tasks = [];

            getValue(draft, loc).tasks.push(removed);
          } else {
            [removed] = draft.splice(lastIndex, 1);
            loc.push((lastIndex - 1).toString());
            getValue(draft, loc).tasks.push(removed);
          }
        });
        setMegaState(newState);
        setTimeout(() => myRef?.current?.focus(), 10);
      }
    }
    if (controlPressed && bracketStartPressed && focus.id) {
      const loc = [...focus.loc];
      const length = loc.length;
      if (length > 1) {
        const newState = produce(megaState, draft => {
          const loc = [...focus.loc];
          const length = loc.length;
          const lastIndex = Number(loc.splice(-1));

          let removed: any;
          if (length > 3) {
            [removed] = getValue(draft, loc.slice(0, length! - 2)).tasks.splice(
              lastIndex,
              1
            );
            const newer: any = loc.splice(-3, 3);
            newer.pop();
            if (typeof getValue(draft, loc).tasks === "undefined")
              getValue(draft, loc).tasks = [];

            const newloc = [...loc];
            const num = Number(newer.slice(-1)) + 1;

            getValue(draft, newloc).tasks.splice(num, 0, removed);
          } else if (length > 1) {
            [removed] = getValue(draft, loc.slice(0, length! - 2)).tasks.splice(
              lastIndex,
              1
            );

            loc.push((lastIndex - 1).toString());
            const newloc = [...loc];

            // if (typeof draft!.tasks! === "undefined") draft!.tasks! = [];
            //@ts-ignore
            draft.splice(Number(loc[0]) + 1, 0, removed);
          }
        });
        setMegaState(newState);
        setTimeout(() => myRef?.current?.focus(), 10);
      }
    }
    return () => {};
  }, [controlPressed, bracketEndPressed, bracketStartPressed]);

  useKeyPress("Enter", () => {
    if (focus.id) {
      const length = focus.loc.length;
      const inArray = Number(focus.loc[length - 1]);
      const id = uuidv4();
      const newState = produce(megaState, draft => {
        if (length === 1) {
          draft.splice(inArray + 1, 0, {
            id,
            value: "",
            tasks: []
          });
        } else {
          getValue(draft, focus.loc.slice(0, length - 2)).tasks.splice(
            inArray + 1,
            0,
            {
              id,
              value: ""
            }
          );
        }
      });
      setMegaState(newState);
      setFocus(focus => ({ ...focus, id }));
    }
  });

  function flat(array: any) {
    var result: any = [];
    array.forEach(function(a: any) {
      result.push(a);
      if (Array.isArray(a.tasks)) {
        result = result.concat(flat(a.tasks));
      }
    });
    return result;
  }

  useKeyPress("ArrowUp", () => {
    if (focus.id) {
      const flattenTasks = flat(megaState).map(({ id }: any) => id);
      const newIndex =
        flattenTasks.findIndex((id: string | null) => id === focus.id) - 1 || 0;
      setFocus(focus => ({
        ...focus,
        id: flattenTasks[newIndex > 0 ? newIndex : 0]
      }));
    }
  });

  useKeyPress("ArrowDown", () => {
    if (focus.id) {
      const flattenTasks = flat(megaState).map(({ id }: any) => id);
      const newIndex =
        flattenTasks.findIndex((id: string | null) => id === focus.id) + 1 ||
        flattenTasks.length - 1;
      const setIndex =
        newIndex < flattenTasks.length - 1 ? newIndex : flattenTasks.length - 1;
      setFocus(focus => ({ ...focus, id: flattenTasks[setIndex] }));
    }
  });

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (focus.id) {
      // console.log(getValue(megaState, focus.loc));
      const newState = produce(megaState, draft => {
        console.log(focus.loc);
        const newLoc = [...focus.loc];
        // console.log(newLoc);
        // console.log(getValue(draft, newLoc));
        if (getValue(draft, newLoc))
          getValue(draft, newLoc).value = event.currentTarget.value;
      });
      // console.log(newState);
      setMegaState(newState);
    }
  };

  // const onclick = useCallback(
  //   (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
  //     // console.dir(event.currentTarget.getAttribute("data-position"));
  //     setFocusLoc(Number(event.currentTarget.getAttribute("data-position")));
  //     // event.stopPropagation();
  //   },
  //   [setFocusLoc]
  // );

  const onblur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFocus(focus => ({ ...focus, id: null }));
  };

  const findLoc = (target: any, n: number[]): any => {
    const { parentNode } = target;
    if (parentNode?.tagName === "LI") n.unshift(parentNode.id);
    if (parentNode?.tagName === "DIV" && parentNode?.id) {
      return [parentNode.id, ...n];
    }
    return parentNode ? findLoc(parentNode!, n) : n;
  };

  // const findLoc2 = (target: any, n: number[]): any => {
  //   const { parentNode } = target;
  //   if (parentNode?.tagName === "LI") n.unshift(parentNode.id);
  //   // if (parentNode?.className === "END") {
  //   //   return [...n];
  //   // }
  //   return parentNode?.className === "End" ? n : findLoc2(parentNode!, n);
  // };

  // console.log(focus.loc);

  const onfocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.currentTarget;
    const loc = findLoc(target, [])
      .map((number: number) => [number, "tasks"])
      .flat();
    loc.pop();
    setFocus(focus => ({ loc, id: target.id }));
  };
  // const onfocus2 = (
  //   event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const target = event.currentTarget;
  //   const loc = findLoc2(target, [])
  //     .map((number: number) => [number, "tasks"])
  //     .flat();
  //   loc.pop();
  //   setFocus(focus => ({ loc, id: target.id }));
  // };

  useEffect(() => {
    setTimeout(() => myRef?.current?.focus(), 5);
    return () => {};
  }, [focus]);

  const duration = 300;
  const [anchorEl, open, enterProps] = useMenuProps(duration);

  const mapFunction = (props: tasks, i: number) => {
    return (
      <li key={props.id} id={i.toString()}>
        <TaskComp
          startingVal={props.value}
          focus={focus}
          id={props.id}
          onFocus={onfocus}
          onBlur={onblur}
          inputRef={props.id === focus.id ? myRef : undefined}
          onChange={onChange}
          value={props.value}
        />
        <ol>{props.tasks && props.tasks.map(mapFunction)}</ol>
      </li>
    );
  };

  // const mapFunction2 = (props: tasks, i: number) => {
  //   return (
  //     <li key={props.id} id={i.toString()}>
  //       <TaskComp
  //         key={props.id}
  //         startingVal={props.value}
  //         focus={focus}
  //         id={props.id}
  //         onFocus={onfocus2}
  //         onBlur={onblur}
  //         inputRef={props.id === focus.id ? myRef : undefined}
  //       />
  //       <ol>{props.tasks && props.tasks.map(mapFunction2)}</ol>
  //     </li>
  //   );
  // };

  return (
    <NewPaper size={8} title="Test">
      {megaState.map(({ value, id, tasks }, i) => {
        return (
          <div key={id} id={i.toString()}>
            <TaskComp
              startingVal={value}
              focus={focus}
              id={id}
              onFocus={onfocus}
              inputRef={id === focus.id ? myRef : undefined}
              onBlur={onblur}
              onChange={onChange}
              value={value}
            />
            <ol>{tasks && tasks.map(mapFunction)}</ol>
          </div>
        );
      })}

      {/* <div className="End">{megaState.map(mapFunction2)}</div> */}
      <Popper open={open} anchorEl={anchorEl} placement="right" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={duration}>
            <Paper
              style={{ background: "rgba(0,0,0,0)" }}
              elevation={0}
              {...enterProps}
            >
              <ChangeHistoryIcon />
              How is Everyone Doing
            </Paper>
          </Fade>
        )}
      </Popper>
    </NewPaper>
  );
};

export default Free;
