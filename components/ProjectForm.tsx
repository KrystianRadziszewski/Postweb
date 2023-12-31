'use client';

import { SessionInterface } from '@/common.types';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import FormField from './FormField';
import { categoryFilters } from '@/constans';
import CustomMenu from './CustomMenu';
import Button from './Button';
import { createNewProject, fetchToken } from '@/lib/actions';
import { useRouter } from 'next/navigation';

type ProjectFormProps = {
	type: string;
	session: SessionInterface;
};

const ProjectForm = ({ type, session }: ProjectFormProps) => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({
		title: '',
		description: '',
		image: '',
		liveSiteUrl: '',
		githubUrl: '',
		category: '',
	});

	const handleStateChange = (fieldName: string, value: string) => {
		setForm((prev) => ({ ...prev, [fieldName]: value }));
	};

	const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const file = e.target.files?.[0];
		console.log('file: ', e.target.files);
		if (!file) return;

		if (!file.type.includes('image')) {
			return alert('Please upload an image file');
		}

		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = () => {
			const result = reader.result as string;
			handleStateChange('image', result);
		};
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsSubmitting(true);

		const { token } = await fetchToken();

		try {
			if (type === 'create') {
				await createNewProject(form, session?.user?.id, token);

				router.push('/');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleFormSubmit} className="flexStart form">
			<div className="flexStart form_image-container">
				<label htmlFor="poster" className="flexCenter form_image-label">
					{!form.image && 'Choose a poster for your project'}
				</label>
				<input type="file" id="image" accept="image/*" required={type === 'create' ? true : false} className="form_image-input" onChange={(e) => handleChangeImage(e)} />
				{form.image && <Image src={form?.image} className="sm:p-10 object-contain z-20" fill alt="Project image" />}
			</div>

			<FormField title="Title" state={form.title} placeholder="Title" setState={(value) => handleStateChange('title', value)} />
			<FormField title="Description" state={form.description} placeholder="Showcase and discover remarkable developer projects." setState={(value) => handleStateChange('description', value)} />
			<FormField type="url" title="Website URL" state={form.liveSiteUrl} placeholder="Website URL" setState={(value) => handleStateChange('liveSiteUrl', value)} />
			<FormField type="url" title="GitHub URL" state={form.githubUrl} placeholder="GitHub URL" setState={(value) => handleStateChange('githubUrl', value)} />
			<CustomMenu title="Category" state={form.category} filters={categoryFilters} setState={(value) => handleStateChange('category', value)} />

			<div className="flexStart w-full">
				<Button
					title={isSubmitting ? `${type === 'create' ? 'Creating' : 'Editing'}` : `${type === 'create' ? 'Create' : 'Edit'}`}
					type="submit"
					leftIcon={isSubmitting ? '' : '/plus.svg'}
					isSubmitting={isSubmitting}
				/>
			</div>
		</form>
	);
};

export default ProjectForm;
