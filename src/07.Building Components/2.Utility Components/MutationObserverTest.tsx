import { useEffect, useRef, useState } from "react";
import MutateObserver from "./MutateObserver";

const MutationObserverTest = () => {
  const [className, setClassName] = useState("bg-blue-300");
  const containerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setClassName("bg-pink-400"), 2000);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new MutationObserver((mutationList: MutationRecord[]) => {
      console.log(mutationList);
    });

    observer.observe(containerRef.current, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }, []);
  return (
    <div ref={containerRef}>
      <div className={className}>
        {className === "bg-blue-300" ? (
          <div>bg-blue-300</div>
        ) : (
          <div>
            <p>bg-pink-400</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CustomMutationObserverTest = () => {
  const [className, setClassName] = useState("bg-blue-300");
  useEffect(() => {
    setTimeout(() => setClassName("bg-pink-400"), 2000);
  }, []);
;
  return (
    <MutateObserver onMutate={(mutations) => console.log(mutations)}>
      <div id="container">
        <div className={className}>
          {className === "bg-blue-300" ? (
            <div>bg-blue-300 !!</div>
          ) : (
            <div>
              <p>bg-pink-400 !!</p>
            </div>
          )}
        </div>
      </div>
    </MutateObserver>
  );
};

export default CustomMutationObserverTest;
