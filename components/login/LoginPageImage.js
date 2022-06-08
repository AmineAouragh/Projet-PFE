import Image from 'next/image'
import goal from '../../public/goal.png'

export function LoginPageImage() {
    return (
        <Image
            src={goal}
            height={450}
            width={450} 
        />
    )
}