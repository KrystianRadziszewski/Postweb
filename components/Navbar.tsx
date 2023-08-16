import { NavLinks } from '@/constans';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AuthProviders } from '.';

const Navbar = () => {
	const session = {};

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
				{session ? (
					<>
						UserPhoto
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
