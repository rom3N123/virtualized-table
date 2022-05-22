import { useEffect, useRef, useState, MutableRefObject, Ref } from 'react';

export type UseNewHorizontalScrollReturn = {
    headerRef: MutableRefObject<HTMLElement>;
    containerRef: MutableRefObject<HTMLElement>;
    getHeaderRef: Ref<HTMLElement>;
    getContainerRef: Ref<HTMLElement>;
};

const useNewSyncHorizontalScroll = () => {
    const headerRef = useRef<HTMLElement | null>(null) as MutableRefObject<HTMLElement | null>;
    const containerRef = useRef<HTMLElement | null>(null) as MutableRefObject<HTMLElement | null>;
    const [isHeaderMounted, setIsHeaderMounted] = useState(false);
    const [isContainerMounted, setIsContainerMounted] = useState(false);
    const areNodesMounted = isHeaderMounted && isContainerMounted;

    useEffect(() => {
        if (areNodesMounted) {
            const onScroll = () => {
                headerRef.current?.scrollTo({
                    left: containerRef.current?.scrollLeft,
                });
            };
            containerRef.current?.addEventListener('scroll', onScroll, {
                capture: true,
                passive: true,
            });

            return () => containerRef.current?.removeEventListener('scroll', onScroll);
        }
        return undefined;
    }, [areNodesMounted]);

    const getHeaderRef = (node: HTMLElement | null): void => {
        headerRef.current = node;
        setIsHeaderMounted(true);
    };

    const getContainerRef = (node: HTMLElement | null): void => {
        containerRef.current = node?.children[0] as HTMLElement;
        setIsContainerMounted(true);
    };

    return {
        headerRef,
        containerRef,
        getHeaderRef,
        getContainerRef,
    };
};

export default useNewSyncHorizontalScroll;
