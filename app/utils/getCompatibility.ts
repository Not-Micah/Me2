import { DocumentData } from 'firebase/firestore'

export const getCompatibility = (user1: DocumentData, user2: DocumentData) => {
  const locationPercentage = user1.location === user2.location ? 1 : 0;
  const curriculumPercentage = user1.curriculum === user2.curriculum ? 1 : 0;

  const hobbiesPercentage = ((list1: string[], list2: string[]) =>
      (common => common === 0 ? 0 : common === 1 ? 0.5 : 0.5 + (common - 1) * 0.1)(list1.filter(item => list2.includes(item)).length))(user1.hobbies, user2.hobbies);

  const agePercentage = ((age1: number, age2: number) => {
      const ageDifference = Math.abs(age1 - age2);
      return Math.max(1 - (ageDifference * 0.1), 0);
    })(user1.age, user2.age);

  /////
  const totalCompatibility = (locationPercentage * 0.3 + curriculumPercentage * 0.2 + 
      hobbiesPercentage * 0.3 + agePercentage * 0.2)

  return totalCompatibility;
}