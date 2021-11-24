import Course from '../models/course';
import Teacher from '../models/teacher';

export const COURSES = [
  new Course(
    'c1',
    '一建法规密训班',
    '密训、名师指导、名师指导、密训指导',
    '2021.05.04至2021.05.07'
  ),
  new Course(
    'c2',
    '一建法规密训班',
    '密训、名师指导、名师指导、密训指导',
    '2021.05.04至2021.05.07'
  ),
  new Course(
    'c3',
    '一建法规密训班',
    '密训、名师指导',
    '2021.05.04至2021.05.07'
  ),
  new Course(
    'c4',
    '一建法规密训班',
    '密训、名师指导',
    '2021.05.04至2021.05.07'
  ),
  // new Course(
  //   'c5',
  //   '一建法规密训班',
  //   '密训、名师指导',
  //   '2021.05.04至2021.05.07'
  // ),
];

export const TEACHERS = [
  new Teacher('t1', '宏宇课堂-特邀名师-金亮', '管理、法规', '国内211高校毕业，拥有国家一级建造师、国家二级心理咨询师、国家二级企业人力资源管理师等多项证书。多年从事教育'),
  new Teacher('t2', '宏宇课堂-特邀名师-王东兴', '管理、法规', '国内211高校毕业，拥有国家一级建造师、国家二级心理咨询师、国家二级企业人力资源管理师等多项证书。多年从事教育'),
];