import React, { useState, useEffect } from "react";

const Dateandtime = () => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <div className="flex flex-row items-center justify-center space-x-2 text-2xl text-blue-900 dark:text-green-200">
                <div className="flex flex-row space-x-1">
                    <p className="font-light">Date: {dateTime.toDateString()} | Time: {dateTime.toLocaleTimeString()}</p>
                </div>
            </div>
        </div>
    );
}

export default Dateandtime;
