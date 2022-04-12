import React, { useEffect, useState } from 'react'

const useApp = () => {
    const [isLoading, setIsLoading] = useState(false);
    // const [progress, setProgress] = useState(0);

    return {
        isLoading,
        setIsLoading,
        // progress,
        // setProgress,
    }
}

export default useApp