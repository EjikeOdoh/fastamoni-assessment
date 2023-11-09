import React from 'react';

import {
  MD3LightTheme as DefaultTheme,
  configureFonts,
  PaperProvider,
} from 'react-native-paper';
import {Provider} from 'react-redux';

import Navigation from './Navigation';
import {store} from './redux/store';

function App() {
  const theme = {
    ...DefaultTheme,
    fonts: configureFonts({
      config: {
        fontFamily: 'Lato-Regular',
      },
    }),
    colors: {
      primary: 'rgb(116, 63, 196)',
      onPrimary: 'rgb(255, 255, 255)',
      primaryContainer: 'rgb(236, 220, 255)',
      onPrimaryContainer: 'rgb(39, 0, 87)',
      secondary: 'rgb(116, 91, 0)',
      onSecondary: 'rgb(255, 255, 255)',
      secondaryContainer: 'rgb(255, 224, 139)',
      onSecondaryContainer: 'rgb(36, 26, 0)',
      tertiary: 'rgb(127, 82, 92)',
      onTertiary: 'rgb(255, 255, 255)',
      tertiaryContainer: 'rgb(255, 217, 224)',
      onTertiaryContainer: 'rgb(50, 16, 26)',
      error: 'rgb(186, 26, 26)',
      onError: 'rgb(255, 255, 255)',
      errorContainer: 'rgb(255, 218, 214)',
      onErrorContainer: 'rgb(65, 0, 2)',
      background: 'rgb(255, 251, 255)',
      onBackground: 'rgb(29, 27, 30)',
      surface: 'rgb(255, 251, 255)',
      onSurface: 'rgb(29, 27, 30)',
      surfaceVariant: 'rgb(232, 224, 235)',
      onSurfaceVariant: 'rgb(73, 69, 78)',
      outline: 'rgb(123, 117, 127)',
      outlineVariant: 'rgb(203, 196, 207)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(50, 48, 51)',
      inverseOnSurface: 'rgb(245, 239, 244)',
      inversePrimary: 'rgb(213, 186, 255)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(248, 242, 252)',
        level2: 'rgb(244, 236, 250)',
        level3: 'rgb(240, 230, 249)',
        level4: 'rgb(238, 228, 248)',
        level5: 'rgb(236, 225, 247)',
      },
      surfaceDisabled: 'rgba(29, 27, 30, 0.12)',
      onSurfaceDisabled: 'rgba(29, 27, 30, 0.38)',
      backdrop: 'rgba(51, 47, 55, 0.4)',
    },
  };
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}

export default App;
