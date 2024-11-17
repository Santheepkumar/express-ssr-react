import React from 'react';
import {useState} from 'react';

const Counter = () => {
    // Initialize the counter state
    const [count, setCount] = useState(0);

    // Function to handle increment
    const increment = () => {
        setCount(count + 1);
    };

    // Function to handle decrement
    const decrement = () => {
        setCount(count - 1);
    };

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
}

const App = ({data}) => {
    console.log('data', data)
    return (
        <div>
            {data?.page && (
                <h2>{data?.page}</h2>
            )}
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Counter/>
        </div>
    )

};

export default App;
