import { useTheme, useMediaQuery } from '@material-ui/core';
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

export const useIsResponsive = (breakpoint: number | Breakpoint) => {
  const theme = useTheme();

  const isTabletResponsive = useMediaQuery( theme.breakpoints.between( "md", breakpoint ), {
    defaultMatches: true
  } );

  const isLargeTabletResponsive = useMediaQuery( theme.breakpoints.between( "md", breakpoint ), {
    defaultMatches: true
  } );

  const isDesktopResponsive = useMediaQuery( theme.breakpoints.between( "lg", breakpoint ), {
    defaultMatches: true
  } );

  const isMobileResponsive = useMediaQuery( theme.breakpoints.down( breakpoint ), {
    defaultMatches: true
  } );

  if ( breakpoint === "md" ) {
    return isTabletResponsive;
  }

  if (breakpoint === "lg") {
    return isLargeTabletResponsive;
  }

  if ( breakpoint === "xl" ) {
    return isDesktopResponsive;
  }

  if ( breakpoint === "sm" ) {
    return isMobileResponsive;
  }
};
