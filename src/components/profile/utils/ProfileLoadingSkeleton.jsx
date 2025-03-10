import React from 'react';

const ProfileLoadingSkeleton = () => {
	return (
		<div className='w-full animate-pulse'>
			{/* Header skeleton */}
			<div className='mb-6'>
				<div className='h-8 bg-gradient-to-r from-white/5 to-white/10 rounded-lg w-3/4 mb-2'></div>
				<div className='h-1 w-20 bg-gradient-to-r from-secondary/30 to-accent1/30 rounded-full mt-2'></div>
			</div>

			{/* Main content skeleton */}
			<div className='bg-glass-dark backdrop-blur-lg border border-white/5 rounded-2xl overflow-hidden'>
				{/* Gradient top border */}
				<div className='h-1 w-full bg-gradient-to-r from-secondary/30 via-accent1/30 to-accent2/30'></div>

				<div className='p-6 sm:p-8'>
					{/* Option 1: User info skeleton for profile page */}
					<div className='flex flex-col md:flex-row items-start md:items-center gap-6 mb-8'>
						{/* Avatar skeleton */}
						<div className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-white/5 to-white/10'></div>

						{/* User details skeleton */}
						<div className='flex-1 w-full'>
							<div className='h-6 bg-white/5 rounded-md w-1/3 mb-3'></div>
							<div className='h-4 bg-white/5 rounded-md w-2/3 mb-5'></div>
							<div className='flex flex-wrap gap-4'>
								<div className='h-8 w-24 bg-white/5 rounded-lg'></div>
								<div className='h-8 w-28 bg-white/5 rounded-lg'></div>
								<div className='h-8 w-20 bg-white/5 rounded-lg'></div>
							</div>
						</div>
					</div>

					{/* Option 2: Data table skeleton for orders/addresses */}
					<div className='space-y-6'>
						<div className='flex justify-between items-center mb-6'>
							<div className='h-8 bg-white/5 rounded-lg w-1/3'></div>
							<div className='h-10 bg-gradient-to-r from-secondary/20 to-accent1/20 rounded-xl w-28'></div>
						</div>

						{/* Data cards/rows - responsive grid or list */}
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
							{[1, 2, 3, 4, 5, 6].map((item) => (
								<div
									key={item}
									className='bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all duration-300'>
									<div className='flex justify-between items-start mb-3'>
										<div className='h-5 bg-white/10 rounded w-2/5'></div>
										<div className='h-5 w-5 rounded-full bg-white/10'></div>
									</div>
									<div className='h-4 bg-white/10 rounded w-full mb-3'></div>
									<div className='h-4 bg-white/10 rounded w-4/5 mb-3'></div>
									<div className='h-4 bg-white/10 rounded w-2/3 mb-4'></div>
									<div className='flex justify-between mt-4'>
										<div className='h-8 bg-white/10 rounded-lg w-1/3'></div>
										<div className='h-8 bg-gradient-to-r from-secondary/20 to-accent1/20 rounded-lg w-1/4'></div>
									</div>
								</div>
							))}
						</div>

						{/* Pagination skeleton */}
						<div className='flex justify-center mt-6'>
							<div className='flex items-center gap-2'>
								{[1, 2, 3, 4, 5].map((item) => (
									<div
										key={item}
										className={`h-8 w-8 rounded-md ${item === 3 ? 'bg-gradient-to-r from-secondary/30 to-accent1/30' : 'bg-white/5'}`}></div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Navigation Placeholder */}
			<div className='fixed bottom-0 left-0 right-0 md:hidden z-[70] h-16 bg-dark/80 backdrop-blur-md border-t border-white/5'>
				<div className='grid grid-cols-5 h-full'>
					{[1, 2, 3, 4, 5].map((item) => (
						<div
							key={item}
							className='flex flex-col items-center justify-center'>
							<div
								className={`h-5 w-5 rounded-full ${item === 1 ? 'bg-gradient-to-r from-secondary to-accent1' : 'bg-white/20'}`}></div>
							<div className='h-2 w-12 bg-white/10 rounded mt-2'></div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProfileLoadingSkeleton;
