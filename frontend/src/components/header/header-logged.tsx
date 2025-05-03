import { Header } from './header';

import {
	IoChatbubblesOutline,
	IoHomeOutline,
	IoPersonOutline,
} from 'react-icons/io5';

import { LinkLogged } from './link-logged';

export function HeaderLogged() {
	return (
		<>
			<nav className="h-full bg-sky-700 w-[100px] fixed flex justify-center shadow">
				<div className="flex gap-3 flex-col justify-center">
					<LinkLogged href="/feed" icon={IoHomeOutline} />
					<LinkLogged href="/chats" icon={IoChatbubblesOutline} />
					<LinkLogged href="/user" icon={IoPersonOutline} />
				</div>
			</nav>
			<Header />
		</>
	);
}
