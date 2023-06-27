import ClickTest from './pages/ClickTest'
import FileDrop from './pages/FileDrop'
import InputFocusTest from './pages/InputFocusTest'
import InputValueTest from './pages/InputValueTest'
import ForwardRefTest from './pages/ForwardRefTest'
import ValidatableInputTest from './pages/ValidatableInputTest'

export default function App() {
  return (
    <main>
      <ValidatableInputTest></ValidatableInputTest>
      <ForwardRefTest></ForwardRefTest>
      <InputValueTest></InputValueTest>
      <InputFocusTest></InputFocusTest>
      <FileDrop></FileDrop>
      <ClickTest></ClickTest>
    </main>
  );
}
