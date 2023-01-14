export default function (time) {
  const now = new Date();
  const livingTime = (now - new Date(time)) / 60000;
  switch (true) {
    case livingTime < 3:
      return "vừa xong";
    case livingTime < 60:
      return `${Math.floor(livingTime)} phút trước`;
    case livingTime < 1440:
      return `${Math.floor(livingTime / 60)} giờ trước`;
    case livingTime < 44640:
      return `${Math.floor(livingTime / 1440)} ngày trước`;
    case livingTime < 525600:
      return `${Math.floor(livingTime / 43200)} tháng trước`;
    default:
      return `${Math.floor(livingTime / 525600)} năm trước`;
  }
}
