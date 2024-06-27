/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.
  
  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.

  Some references used:
  https://claritydev.net/blog/the-most-common-mistakes-when-using-react
*/
import { useEffect } from "react";

export function FunctionsAsComponents({ buttonText = "Start Now" }) {
  const showButton = () => {
    <button>{buttonText}</button>;
  };

  return <div>{showButton()}</div>;
}

export function FunctionsAsComponentsV2({ buttonText = "Start Now" }) {
  // There was no need to define a function to render the button. This rendering function was being re-defined every time the
  // component re-renders. This is a waste of resources. You could just move the function outside the component and it wouldn't be
  // recreated on every render. But as the function is not really necessary, I decided to just render the button directly.
  return (
    <div>
      <button>{buttonText}</button>
    </div>
  );
}

export function objectCopying() {
  const object = { a: { c: 1 }, b: 2 };
  const copy = { ...object };
  copy.a.c = 2;
  return { ...object };
}

export function objectCopyingV2() {
  // The spread operator creates a shallow copy, so the nested object "a" was being copied by reference. This means that, when updating
  // the object nested in property "a", it was updating the same value in memory that the original object was pointing to. So the value
  // inside "object.a.c" also changed. I fixed it adding a spread operator to copy the nested "a" object as well. Also, I returned the
  // copy directly, instead of a new shallow copy of the original (updated) object, as the original function did.
  const object = { a: { c: 1 }, b: 2 };
  const copy = { ...object, a: { ...object.a } };
  copy.a.c = 2;
  return copy;
}

export function arrayCopying() {
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }];
  const copy = [...array];
  return copy;
}

export function arrayCopyingV2() {
  // Same as the object copying function, the spread operator creates a shallow copy of the array, so the objects inside the array are
  // still referencing to the same memory address. For example, if we would then update copy[0].a, it would also update array[0].a
  // I fixed it by mapping the array and doing the shallow copy but over the objects this time, so we now create a new object in memory
  // (.map function already creates a new array, so we don't need any other copy or spread operator for the array itself)
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }];
  const copy = array.map((obj) => ({ ...obj }));
  return copy;
}

// user abort
export function UseEffect({ fetchURL, label }) {
  useEffect(() => {
    const fetchData = async () => {
      await fetch(fetchURL);
    };

    fetchData();
  }, [fetchURL]);

  return (
    <div>
      <button>{label}</button>
    </div>
  );
}

export function UseEffectV2({ fetchURL, label }) {
  // I don't really get what should be the purpose of this component. It does a fetch request but doesn't do anything with the
  // response. So I removed the fetchData function and just left the fetch call directly, because if we don't care about the
  // response, then we don't need to make it wait for the fetch to finish.
  // If we would need the response, then we should probably set it in a state when the request is resolved, add a loading state
  // to properly let the user know that we are still preparing the page content, and handle errors as well.
  // Finally, if we would need to do the request when the button is pressed, then we should add an "onClick" event handler to
  // the button element and make the fetch request inside that function.
  useEffect(() => {
    fetchData(fetchURL);
  }, [fetchURL]);

  return (
    <div>
      <button>{label}</button>
    </div>
  );
}

export function UseEffectDerivedCalculation() {
  const [remainder, setReminder] = useState();
  const [clickedTimes, setClickedTimes] = useState();

  useEffect(() => {
    setReminder(clickedTimes % 5);
  }, [clickedTimes]);

  const handleClick = () => setClickedTimes(clickedTimes + 1);

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>{sum}</span>
      <span>{remainder}</span>
    </div>
  );
}

export function UseEffectDerivedCalculationV2() {
  // We didn't need another state to store the remainder value, as it could be calculated directly from the clickedTimes state.
  // In the original component, it updated the state when the button was clicked, then React re-rendered the component because of
  // the state change, triggered the useEffect hook, which updated the remainder state, and therefore re-rendered the component
  // once more. In this new version, we only have the clickedTimes value in state, and when this changes, the remainder is
  // calculated on the same render cycle, which makes it more efficient. Also, clickedTimes should be initialized as 0
  const [clickedTimes, setClickedTimes] = useState(0);
  const remainder = clickedTimes % 5;

  const handleClick = () => setClickedTimes(clickedTimes + 1);

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>{sum}</span>
      <span>{remainder}</span>
    </div>
  );
}

export function UseEffectLifeCycle() {
  const [_loaded, setLoaded] = useState();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 1000);
  }, []);

  const handleClick = () => setClickedTimes(clickedTimes + 1);

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>{clickedTimes}</span>
    </div>
  );
}

export function UseEffectLifeCycleV2() {
  // For one side, the component doesn't do anything with the loaded state, and it was also using clickedTimes and setClickedTimes
  // which were not defined anywhere. I think the issue is around the loaded state but it is hard to find it because I don't really
  // know what is it for. Once the useEffect is executed, the component is quite loaded already, so I don't see the point of setting
  // a loaded state after 1 second, triggering a new re-render with no real changes.
  // I just added a proper default value set to false for the loaded state, and also added a cleanup function to clear the timeout
  // in case the component is unmounted before the timeout is executed to prevent it from trying to update the state of an
  // unmounted component.
  const [clickedTimes, setClickedTimes] = useState(0);

  const [_loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timeoutValue = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timeoutValue);
  }, []);

  const handleClick = () => setClickedTimes(clickedTimes + 1);

  return (
    <div>
      <button onClick={handleClick}>Add Click Count</button>
      <span>{clickedTimes}</span>
    </div>
  );
}

export function DirtyUnmount() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
  }, []);

  return <div>Clock in seconds: {time}</div>;
}

export function DirtyUnmountV2() {
  // The setInterval function returns an interval ID that should be cleared when the component is unmounted to prevent memory leaks.
  // Therefore, I just executed the clearInterval function inside the useEffect cleanup function.
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalValue = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(intervalValue);
  }, []);

  return <div>Clock in seconds: {time}</div>;
}

export function AvoidingUseState() {
  const ref = useRef("Unmounted");

  useEffect(() => {
    ref.current = "Mounted";
  }, []);

  return <div>{ref.current}</div>;
}

export function AvoidingUseStateV2() {
  // In this case, the value was not being updated in the DOM because it was not a state value. The useRef hook is used to store
  // mutable values that are not meant to trigger a re-render when they are updated. Therefore, the value of the ref was being
  // updated when the component mounted, but the component was not re-rendered, so the value will not be updated in the DOM.
  // I just used the useState hook to store the value as part of the component state.
  const [componentState, setComponentState] = useState("Unmounted");

  useEffect(() => {
    setComponentState("Mounted");
  }, []);

  return <div>{componentState}</div>;
}

async function API() {
  return true;
}

export function UntraceableState() {
  const [result, setResult] = useState();
  let loading = false;

  useEffect(() => {
    const fetchData = async () => {
      loading = true;
      const result = await API();
      loading = false;
      setResult(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <span>Loading: {loading}</span>
      Result:{result}
    </div>
  );
}

export function UntraceableStateV2() {
  // Here the loading data was not being updated in the DOM because it was not a state value. The loading variable was being updated
  // directly, but React doesn't know that the component should re-render when the value on that variable changes. It was only
  // updating the DOM when the result state was updated, and when re-rendering, the loading variable was again set to false by its
  // default value. I just used the useState hook to store the loading state as part of the component state.
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await API();
      setLoading(false);
      setResult(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <span>Loading: {String(loading)}</span>
      Result:{result}
    </div>
  );
}

export function CrudeDeclarations() {
  const calendarDays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  return (
    <ol>
      {calendarDays.map((val) => (
        <span key={val}>{val}</span>
      ))}
    </ol>
  );
}

const calendarDays = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];
export function CrudeDeclarationsV2() {
  // The calendarDays array was being declared inside the component function, which means that it was being re-created every time the
  // component re-renders. This is a waste of resources, as the array is always the same and doesn't need to be re-created.
  // I just moved the array declaration outside the component function, so it is only created once when the file is loaded.
  return (
    <ol>
      {calendarDays.map((val) => (
        <span key={val}>{val}</span>
      ))}
    </ol>
  );
}

export function MagicNumbers(age) {
  return (
    <ol>{age < 18 ? <div>Spicy</div> : <div>You are not old enough</div>}</ol>
  );
}

const MIN_AGE = 18;
export function MagicNumbersV2(age) {
  // the 18 value was being hardcoded in the component without any context. These values should be set as constants to give meaning
  // to it and to make it easier to change in the future (It could be used in many components). I just created a constant outside
  // the component. Also, I changed the condition to check if the age is greater than, instead of less than, the minimum age.
  // (Logic error in original component)
  return (
    <ol>
      {age > MIN_AGE ? <div>Spicy</div> : <div>You are not old enough</div>}
    </ol>
  );
}

export function UnidiomaticHTMLStructure() {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {};

  return (
    <div>
      <input value={name} name="name" type="text" onChange={setName} />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export function UnidiomaticHTMLStructureV2() {
  // In the original component, the input was not inside a form element, which is not a good practice. It is always better to use the
  // correct semantic HTML elements, so the browser knows exactly what everything is and we improve accessibility. For example, some
  // plugins may need to detect when something is a form, and we also have the submit event triggered when the user presses the enter
  // key. Also, I updated the input onChange function because the handler receives an event object, and we need to get the value from
  // there to set it in the name state.
  const [name, setName] = useState("");
  const handleSubmit = (e) => {};

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        name="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export function CrudeStateManagement() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {};

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} name="name" type="text" onChange={setName} />
      <input value={age} name="age" type="number" onChange={setAge} />
      <input
        value={location}
        name="location"
        type="text"
        onChange={setLocation}
      />
      <input value={email} name="email" type="email" onChange={setEmail} />
      <input
        value={password}
        name="password"
        type="password"
        onChange={setPassword}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export function CrudeStateManagementV2() {
  // In this one, we were handling a lot of different states with primitive values when we could just handle a single object with all
  // the form values to make it more readable. Also, this way we can define only one onChange handler for all the inputs, and we can
  // use the input name to set the correct value in the formValues object. Finally, I also fixed an issue because it was trying to set
  // the whole event object in the states, by not extracting "e.target.value" from the event object.
  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
    location: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {};

  const handleInputChange = (e) => {
    const [name, value] = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formValues.name}
        name="name"
        type="text"
        onChange={handleInputChange}
      />
      <input
        value={formValues.age}
        name="age"
        type="number"
        onChange={handleInputChange}
      />
      <input
        value={formValues.location}
        name="location"
        type="text"
        onChange={handleInputChange}
      />
      <input
        value={formValues.email}
        name="email"
        type="email"
        onChange={handleInputChange}
      />
      <input
        value={formValues.password}
        name="password"
        type="password"
        onChange={handleInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export function UnidiomaticHTMLHierarchy() {
  const bids = [1, 2, 3];
  const asks = [1, 2, 3];

  return (
    <li>
      {bids.map((bid, i) => (
        <span key={i}>{bid}</span>
      ))}
      {asks.map((ask, j) => (
        <span key={j + "asks"}>{ask}</span>
      ))}
    </li>
  );
}

export function UnidiomaticHTMLHierarchyV2() {
  // In the original function we had only one <li /> element being used as the container for the list, and the <span /> elements were
  // being used as the list items. Following the HTML semantics, we should use the <ul /> (or <ol />) element as the container for the
  // list, and <li /> for each item. (If needed, we could also leave the <span /> inside the <li /> element)
  // Also, I updated the element keys, which ideally should contain a unique id of each item.
  const bids = [1, 2, 3];
  const asks = [1, 2, 3];

  return (
    <ul>
      {bids.map((bid, i) => (
        <li key={`bid-${i}`}>{bid}</li>
      ))}
      {asks.map((ask, j) => (
        <li key={`ask-${j}`}>{ask}</li>
      ))}
    </ul>
  );
}

export function SubstandardDataStructure() {
  const [error, setError] = useState("");

  return (
    <div>
      <button onClick={() => setError("Error A")}>Throw Error A</button>
      <button onClick={() => setError("Error B")}>Throw Error B</button>
      <button onClick={() => setError("")}>Clear Errors</button>
      <div>{error}</div>
    </div>
  );
}

export function SubstandardDataStructureV2() {
  // In this case, I updated the error state to be an array, so we can store multiple errors at the same time. I also added the
  // getUpdateErrorsHandler HOF to simplify the definition of the onClick event handlers.
  const [errors, setErrors] = useState([]);

  const getUpdateErrorsHandler = (newError) => () => {
    if (newError) {
      setErrors((prev) => [...new Set([...prev, newError])]);
    } else {
      setErrors([]);
    }
  };

  return (
    <div>
      <button onClick={getUpdateErrorsHandler("Error A")}>Throw Error A</button>
      <button onClick={getUpdateErrorsHandler("Error B")}>Throw Error B</button>
      <button onClick={getUpdateErrorsHandler()}>Clear Errors</button>
      {errors.map((err) => (
        <div key={`err-${err}`}>{err}</div>
      ))}
    </div>
  );
}

// another option for the previous function
export function SubstandardDataStructureV3() {
  // If we want to keep only one error at a time, I would update the value of the empty error state to use null, so we explicitly
  // say that there is no error, and we would only show the error div if the error state is not null.
  // A similar getUpdateErrorHandler HOF could also be implemented here
  const [error, setError] = useState(null);
  const clearError = () => setError(null);

  return (
    <div>
      <button onClick={() => setError("Error A")}>Throw Error A</button>
      <button onClick={() => setError("Error B")}>Throw Error B</button>
      <button onClick={clearError}>Clear Errors</button>
      {error && <div>{error}</div>}
    </div>
  );
}

export function DangerousIdentifier() {
  const [people, setPeople] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const person = new FormData(e.target);
    setPeople((ppl) => [...ppl, ...person]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button>Add Person</button>
      </form>
      <ul>
        {people.map((person) => (
          <span key={person.name}>{person.name}</span>
        ))}
      </ul>
    </div>
  );
}

export function DangerousIdentifierV2() {
  // The original function didn't have a name for the input, so it didn't have a key to use for the name value in the formData.
  // Also, it was not using Object.fromEntries() to convert the FormData object to a plain object, so the people state was not
  // being stored with the right structure. In this new version, we are properly setting the people state as an array of objects
  // with the name property.
  // Additionally, we switched the <span /> elements for <li /> so we use the semantically correct element for the list items.
  // Finally, we added a ref to keep track of the count of added people, so we have a unique key for each person.
  // Previously it was setting the key as the person name, which could be repeated and lead to unexpected behavior.
  const [people, setPeople] = useState([]);
  const addedPeopleCount = useRef(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const person = new FormData(e.target);
    setPeople((ppl) => [
      ...ppl,
      Object.fromEntries([...person, ["key", addedPeopleCount.current]]),
    ]);
    addedPeopleCount.current++;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" />
        <button>Add Person</button>
      </form>
      <ul>
        {people.map((person) => (
          <li key={person.key}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

async function fetchLeader() {
  return { name: "Messi" };
}
async function fetchDetails(leader) {
  return { ...leader, country: "Argentina" };
}

// Hint: this only requires a single line change!
export function UnnecessaryEffectTriggering() {
  const [leader, setLeader] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const leader = await fetchLeader();
      setLeader(leader);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function enhanceRecord() {
      const enriched = await fetchDetails(leader);
      setLeader(enriched);
    }
    enhanceRecord();
  }, [leader]);

  return (
    <div>
      <div>Leader:{leader.name}</div>
      {leader.country && <div>{`From: ${leader.country}`}</div>}
    </div>
  );
}

export function UnnecessaryEffectTriggeringV2() {
  // In the original component, it was updating the leader state inside the second useEffect hook, after fetching the details. But
  // at the same time, this useEffect has the whole leader object as a dependency, so the hook is being triggered every time we
  // invoke the setLeader function. (Because state is immutable, it will always create a new object, so the reference will always
  // change). This creates a loop where the second useEffect is constantly being triggered and freezes the UI. Changing only one
  // line, I changed the dependency array of the second useEffect to be the primitive values inside the object (name and country).
  // This prevents it from being triggered every time the leader state is set, but only when the data actually changes. Although
  // this will still trigger the useEffect twice, because the first time it will set the new country value, which we included in
  // the dependency array, that it should trigger the effect again.
  // By changing more lines, I would make the 2 fetch functions to be called in the same function (awaiting the first one) and
  // then set the leader state. Also, if we would want to show the name before fetching the country, we could have 2 different
  // states to store the name and the country.
  const [leader, setLeader] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const leader = await fetchLeader();
      setLeader(leader);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function enhanceRecord() {
      const enriched = await fetchDetails(leader);
      setLeader(enriched);
    }
    enhanceRecord();
  }, [leader.name, leader.country]);

  return (
    <div>
      <div>Leader:{leader.name}</div>
      {leader.country && <div>{`From: ${leader.country}`}</div>}
    </div>
  );
}

async function trackClick(ids) {
  return ids;
}

// Hint: same error pattern as above
export function IncorrectDependencies(records) {
  const handleClick = useCallback(() => {
    trackClick(records);
  }, [records]);

  return (
    <div>
      {records.map((record) => (
        <div id={record.id}>{record.name}</div>
      ))}
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

// Hint: same error pattern as above
export function IncorrectDependenciesV2({ records }) {
  // In this case, the div used inside the map function had an "id" set, but not the "key" prop, which is important when using the
  // map function to render a list. Finally, the useCallback was not necessary for this use case, but if used, it doesn't make sense
  // to use the records prop as a dependency, because the array reference will always change, and the function will be re-created
  // anyways every time the parent component re-renders. Keeping the useCallback, I just used destructuring to check for the
  // elements inside the array.
  const handleClick = useCallback(() => {
    trackClick(records);
  }, [...records]);

  return (
    <div>
      {records.map((record) => (
        <div id={record.id}>{record.name}</div>
      ))}
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

export function UnnecessaryFunctionRedefinitions(emails) {
  const validateEmail = (email) => email.includes("@");

  return (
    <div>
      {emails.map((email) => (
        <div key={email}>
          {email} is {validateEmail(email) ? "Valid" : "Invalid"}
        </div>
      ))}
    </div>
  );
}

const validateEmail = (email) => email.includes("@");
export function UnnecessaryFunctionRedefinitionsV2({ emails }) {
  // In the original component, the validateEmail function was being redefined every time the component re-renders, which was not
  // necessary because it is a pure function that doesn't depend on any external state. So I just moved the function definition
  // outside the component. This way it will only be created once when the file is loaded, and will not depend on the
  // component lifecycle.
  return (
    <div>
      {emails.map((email) => (
        <div key={email}>
          {email} is {validateEmail(email) ? "Valid" : "Invalid"}
        </div>
      ))}
    </div>
  );
}

async function fetchRecords() {
  return [{ id: 1, type: "record" }];
}
async function fetchAlternateRecords() {
  return [{ id: 1, type: "alt-record" }];
}

export function SerialLoading() {
  const [records, setRecords] = useState([]);
  const [altRecords, setAltRecords] = useState([]);

  useEffect(() => {
    async function loadRecords() {
      const recs = await fetchRecords();
      const altRecs = await fetchAlternateRecords();
      setRecords(recs);
      setAltRecords(altRecs);
    }
    loadRecords();
  }, []);

  return (
    <div>
      {records.map((rec) => (
        <div key={rec.id}></div>
      ))}
      {altRecords.map((rec) => (
        <div key={rec.id}></div>
      ))}
    </div>
  );
}

export function SerialLoadingV2() {
  // In the original component it was doing an await to fetch the first records, and only when that was resolved, it was fetching the
  // altRecords. This adds unnecessary loading time to the page, as we could fetch both at the same time because they don't depend on
  // each other. I proposed 2 solutions here that could be used depending on the needs. The fist one is using Promise.all() to fetch
  // both records at the same time, and then set them in the state. This way, React will show all records after the last one is
  // resolved, but set it on the state in the same bulk update, so it will only re-render once. The second option is to use the
  // .then() syntax to fetch both records together, without waiting for the first one to resolve before fetching the next one. In
  // this case, we can set the states independently. This will allow us to show the first response that we get independently of the
  // other one being resolved or not. But it will also re-render the component twice (one for each fetch response)
  const [records, setRecords] = useState([]);
  const [altRecords, setAltRecords] = useState([]);

  // Option 1: Using Promise.all()
  useEffect(() => {
    async function fetchAllRecords() {
      const [rec, altRec] = await Promise.all([
        fetchRecords(),
        fetchAlternateRecords(),
      ]);
      setRecords(rec);
      setAltRecords(altRec);
    }
    fetchAllRecords();
  }, []);

  // Option 2: Using .then() syntax
  useEffect(() => {
    fetchRecords().then((val) => setRecords(val));
    fetchAlternateRecords().then((val) => setAltRecords(val));
  }, []);

  return (
    <div>
      {records.map((rec) => (
        <div key={rec.id}></div>
      ))}
      {altRecords.map((rec) => (
        <div key={rec.id}></div>
      ))}
    </div>
  );
}

async function fetchRecords() {
  return [{ id: 1, type: "record" }];
}
async function fetchAlternateRecords() {
  return [{ id: 1, type: "alt-record" }];
}

// Hint: part of the rendering structure is re-rendered frequently unnecessarily
export function UnoptimizableRenderingStructure(altRecords) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function loadRecords() {
      const interval = setInterval(async () => {
        const recs = await fetchRecords();
        setRecords(recs);
      }, 5000);

      return () => clearInterval(interval);
    }
    loadRecords();
  }, []);

  return (
    <div>
      <ul>
        {records.map((rec) => (
          <li key={rec.id}>{rec.id}</li>
        ))}
      </ul>
      <ul>
        {altRecords.map((rec) => (
          <li key={rec.id}>{rec.id}</li>
        ))}
      </ul>
    </div>
  );
}

export function UnoptimizableRenderingStructureV2({ altRecords }) {
  // In this case, this component is being re-render every time the interval is executed, because it is setting the records state.
  // This makes sense because we are rendering the records inside the component. But the altRecords are being passed as a prop and
  // we don't really need to re-render the altRecords list every time the records list is updated. So I moved the records list to
  // a different component. This way they don't force the altRecords list to re-render every time the interval function is executed.
  // Ideally, altRecords would also have its own list component.
  return (
    <div>
      <RecordsList /> {/* Component defined below */}
      <ul>
        {altRecords.map((rec) => (
          <li key={rec.id}>{rec.id}</li>
        ))}
      </ul>
    </div>
  );
}
const RecordsList = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function loadRecords() {
      const interval = setInterval(async () => {
        const recs = await fetchRecords();
        setRecords(recs);
      }, 5000);

      return () => clearInterval(interval);
    }
    loadRecords();
  }, []);

  return (
    <ul>
      {records.map((rec) => (
        <li key={rec.id}>{rec.id}</li>
      ))}
    </ul>
  );
};

// Bonus: A few functions were not destructuring the props object to get the values, so they would not work properly because they would
// receive the props object instead of the value they were expecting
