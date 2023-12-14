import { UseNetwork, UseSolidAlgoWallets } from "solid-algo-wallets"
import { For, Show } from "solid-js"
import { ellipseString } from "../lib/utilities"
import useBonfire from "../lib/useBonfire"

export default function Header() {
  const { activeWallet, address, setAddress, disconnectWallet } = UseSolidAlgoWallets
  const { activeNetwork, setActiveNetwork, networkNames } = UseNetwork
  const { infoOpen, setInfoOpen } = useBonfire
  return (
    <div class="sticky top-0 z-50 flex flex-row items-center bg-base-300 p-2 sm:px-4">
      <div class="flex items-end">
        <h1 class="ml-1 flex bg-gradient-to-l from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          Bonfire
        </h1>
        <p class="text-xs">Beta</p>
      </div>
      <div class="grow" />
      <div class="flex gap-2">
        <button
          class={infoOpen() ? `btn btn-outline` : `btn btn-ghost`}
          name="information"
          onClick={() => setInfoOpen(!infoOpen())}
        >
          {infoOpen() ? "Close" : "About"}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg> */}
        </button>
        <Show when={activeWallet() !== undefined}>
          <div class="dropdown dropdown-end dropdown-bottom">
            <div
              class="btn btn-ghost"
              tabindex="0"
              role="button"
            >
              {activeNetwork()[0]}
            </div>
            <ul class="menu dropdown-content z-[2] rounded-box bg-base-100 p-2">
              <For each={networkNames.filter((n) => n === "TestNet" || n === "LocalNet")}>
                {(network) => (
                  <li>
                    <button
                      value={network}
                      onClick={() => setActiveNetwork(network)}
                    >
                      {network}
                    </button>
                  </li>
                )}
              </For>
            </ul>
          </div>
          <div class="dropdown dropdown-end dropdown-bottom">
            <div
              class="btn btn-ghost"
              tabindex={0}
              role="button"
            >
              {ellipseString(address(), 3)}
            </div>
            <ul
              tabIndex={0}
              class="menu dropdown-content z-[2] rounded-box bg-base-100 p-2 shadow"
            >
              <For each={activeWallet()?.accounts()}>
                {(acc) => (
                  <li>
                    <div onClick={() => setAddress(acc.address)}>
                      {ellipseString(acc.address, 4)}
                    </div>
                  </li>
                )}
              </For>
              <li>
                <div
                  onClick={() => disconnectWallet()}
                  aria-label="Disconnect"
                >
                  Disconnect
                </div>
              </li>
            </ul>
          </div>
        </Show>
      </div>
    </div>
  )
}
