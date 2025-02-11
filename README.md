<div align="center">
	<br>
	<br>
	<img src="./media/superhooks-logo.png" alt="superhooks" height="70">
	<br>
	<br>
	<b>A collection of React Hooks</b>
	<br>
	<br>
	<br>
	<br>
	<hr>
</div>

[![NPM](https://img.shields.io/npm/l/reactjs-superhooks)](https://github.com/harshitgambhir/reactjs-superhooks/blob/main/LICENSE.md)
[![NPM Version](https://img.shields.io/npm/v/reactjs-superhooks)](https://www.npmjs.com/package/reactjs-superhooks)

# Superhooks

Superhooks is a simple, modern, server-safe React Hooks.

Compatible with React v16.8.0+.

## Install

#### NPM

```sh
npm install superhooks
```

#### Yarn

```sh
yarn add superhooks
```

#### PNPM

```sh
pnpm install superhooks
```

<br>

## Testing

This project uses [jest](https://jestjs.io/) as the testing framework and [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro) for testing React components and hooks.

### Running Tests

To execute all unit tests with coverage enabled

```sh
npm run test
```

<br>

## Usage

<br>

```jsx
import { useWindowSize } from '../hooks/useWindowSize';

function ExampleComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window width: {width}px</p>
      <p>Window height: {height}px</p>
    </div>
  );
}

export default ExampleComponent;
```

## Contributing

Superhooks is always open to improvements and contributions, you can check the [Open Issues](https://github.com/harshitgambhir/reactjs-superhooks/issues) if you want to contribute, and it's also possible to request to add your own improvements/ideas using the [Feature Request](https://github.com/harshitgambhir/reactjs-superhooks/issues/new/choose) template. Before contributing, please read the [Contribution Guide](https://github.com/harshitgambhir/reactjs-superhooks/blob/main/CONTRIBUTING.MD) and make sure to respect the standards!

## Hooks

- `useWindowSize()` - Tracks and updates browser window size on resize.
- `useDebounce()` - Delays updating the value until after the specified delay.
- `useLocalStorage()` - Persist a state value in localStorage.

## Maintainers

[Harshit Gambhir](https://github.com/harshitgambhir)

## License

MIT
