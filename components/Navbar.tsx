import { NavLinks } from '@/constans';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AuthProviders } from '.';
import { getCurrentUser } from '@/lib/session';

const Navbar = async () => {
	const session = await getCurrentUser();

	return (
		<nav className="flexBetween navbar">
			<div className="flexStart flex-1 gap-10">
				<Link href={`/`}>
					<Image src={`/logo.svg`} height={40} width={115} alt="logo image" />
				</Link>
				<ul className="xl:flex hidden text-small gap-7">
					{NavLinks.map((link) => (
						<Link href={link.href} key={link.key}>
							{link.text}
						</Link>
					))}
				</ul>
			</div>

			<div className="flexStart gap-4">
				{session?.user ? (
					<>
						{session?.user?.image && <Image src={session.user.image} width={40} height={40} className=" rounded-full" alt={`Logo profil: ${session.user.name}`} />}
						<Link href={`/create-project`}>Share Work</Link>
					</>
				) : (
					<AuthProviders />
				)}
			</div>
		</nav>
	);
};

export default Navbar;
