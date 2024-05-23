import { useCallback, useEffect, useRef } from 'react'

const useDebouncedScroll = (
  callback: (arg: boolean) => void,
  delay: number
) => {
  const lastScrollY = useRef(0)
  const debounceTimeout = useRef<NodeJS.Timeout>()

  const debouncedHandleScroll = useCallback(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    debounceTimeout.current = setTimeout(() => {
      const currentScrollY = window.scrollY
      callback(currentScrollY > (lastScrollY.current as number))
      lastScrollY.current = currentScrollY
    }, delay)
  }, [callback, delay])

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll)
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll)
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [debouncedHandleScroll])
}

export default useDebouncedScroll
