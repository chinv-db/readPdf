# readPdf
Read multiple pdf files from a Google Driver folder

Đoạn Google Script này cho phép đọc thông tin trong file Pdf trên file Google Driver

Tại sao có đoạn script này?
- Để đối soát tài chính, mình cần đọc khoảng 650 invoices của Facebook (là những khoản chi trong vòng 2 tháng)
- Từ mỗi invoices đó, lấy ra 9 trường thông tin, gồm:
    1. File Name
    2. Ad Account Name
    3. Ad Account ID
    4. Reference Number
    5. Transaction ID
    6. Paid
    7. Payment Date
    8. Payment Method
    9. Paid Status
- Việc kiểm tra bằng tay rất mất thời gian, dễ gây nhầm lẫn, tóm lại là không khả thi. Đó là lý do mình viết đoạn script này.

Sử dụng đoạn script này như thế nào?
- Up hết invoices cần đọc lên 1 folder. Đừng lo, đọc xong có thể xóa đi cho đỡ nặng. Copy lại ID của folder này
- Trước tiên, bạn tạo 1 file Google Sheet, lấy 9 trường thông tin kia là tên 9 columns
- Trên phần menu của file Google Sheet, chọn Tools, chọn tiếp Script Editor
- Copy đoạn Script này và paste vào Script Editor của Google Sheet
- Paste folder ID vừa copy vào đoạn getFolderById('')
- Trên menu của Script Editor, chọn Resources, chọn tiếp Advanced Google Services, enable Driver API và Driver Activity API
- Lưu file lại.
- Chạy thôi, dữ liệu lọc ra sẽ được tự động ghi vào Google Sheet 

Lưu ý: 
- Việc tùy chỉnh script đòi hỏi bạn phải có kiến thức cơ bản về Google Script
