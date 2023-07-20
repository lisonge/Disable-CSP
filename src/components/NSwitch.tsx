import { Switch } from '@kobalte/core';
import type { JSX } from 'solid-js';
import './NSwitch.css';

export type NSwitchProps = {
  label?: JSX.Element;
  checked?: boolean;
  onChange?: (newChecked: boolean) => void;
};
export default function NSwitch(props: NSwitchProps) {
  return (
    <Switch.Root
      class="switch__root"
      checked={props.checked}
      onChange={props.onChange}
    >
      <Switch.Label class="switch__label"> {props.label} </Switch.Label>
      <Switch.Input class="switch__input" />
      <Switch.Control class="switch__control">
        <Switch.Thumb class="switch__thumb" />
      </Switch.Control>
    </Switch.Root>
  );
}
