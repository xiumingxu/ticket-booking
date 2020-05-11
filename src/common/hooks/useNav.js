import { useCallback } from "react";
import { h0 } from "../utils/fp";

// a data transformer
export default function useNav(departDate, dispatch, prevDate, nextDate) {
  // I did not know why doing like this
  const isPrevDisabled = h0() >= h0(departDate);
  const isNextDisabled = h0(departDate) - h0() > 20 * 24 * 600 * 1000;

  const prev = useCallback(() => {
    if (isPrevDisabled) return;
    dispatch(prevDate());
  }, [isPrevDisabled]);

  const next = useCallback(() => {
    if (isNextDisabled) return;
    dispatch(nextDate());
  }, [isNextDisabled]);

  return {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next
  };
}
