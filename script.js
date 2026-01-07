// الاتصال بـ Supabase
const supabaseUrl = "https://lmoalkwfmemgtlyezpdo.supabase.co";
const supabaseKey = "sb_publishable_ZpstGvn0ekVJlEzDXqlR7A_uzg16IUn";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// التأكد أن الصفحة هي صفحة الطالب
const form = document.getElementById("reportForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const type = document.querySelector('input[name="type"]:checked').value;
    const student_name = document.getElementById("student_name").value;
    const grade = document.getElementById("grade").value;
    const section = document.getElementById("section").value;
    const description = document.getElementById("description").value;
    const solution_idea = document.getElementById("solution_idea").value || null;

    let image_url = null;
    const imageInput = document.getElementById("image");
    if (imageInput && imageInput.files[0]) {
      const reader = new FileReader();
      image_url = await new Promise((resolve) => {
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(imageInput.files[0]);
      });
    }

    const { error } = await supabase.from("reports").insert([{
      type,
      student_name,
      grade,
      section,
      description,
      solution_idea,
      image_url,
      is_resolved: false
    }]);

    if (error) {
      alert("❌ حدث خطأ أثناء الإرسال");
      console.error(error);
    } else {
      alert("✅ تم إرسال البلاغ بنجاح");
      form.reset();
      const preview = document.getElementById("imagePreview");
      if (preview) preview.innerHTML = "";
    }
  });
}