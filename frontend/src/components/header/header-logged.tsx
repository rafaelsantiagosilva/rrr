import { Header } from './header';

import {
	IoChatbubblesOutline,
	IoHomeOutline,
	IoPersonOutline,
} from 'react-icons/io5';

import { LinkLogged } from './link-logged';

export function HeaderLogged() {
	return (
		<div className="z-10">
			<nav className="h-full bg-sky-700 w-[100px] fixed hidden justify-center shadow md:flex">
				<div className="flex gap-3 flex-col justify-center">
					<LinkLogged href="/feed" icon={IoHomeOutline} />
					<LinkLogged href="/conversations" icon={IoChatbubblesOutline} />
					<LinkLogged href="/user" icon={IoPersonOutline} />
				</div>
			</nav>
			<nav className="w-full bg-sky-700 h-[100px] fixed bottom-0 flex justify-center shadow md:hidden">
				<div className="flex gap-3 justify-between items-center">
					<LinkLogged href="/feed" icon={IoHomeOutline} />
					<LinkLogged href="/conversations" icon={IoChatbubblesOutline} />
					<LinkLogged href="/user" icon={IoPersonOutline} />
				</div>
			</nav>
			<Header />
		</div>
	);
}
