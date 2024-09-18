import { useLocale } from 'next-intl';

export default function Policy() {
  const locale = useLocale();

  return (
    <div className="container mx-auto pb-36 p-8">
      {locale === 'ar' ? (
        <div className="text-right">
          <h1 className="text-3xl font-bold mb-4">سياسة الخصوصية</h1>
          <p className="mb-4">
            مرحبًا بكم في الملاح. هذا الموقع مخصص لتغطية وتوثيق الأماكن
            السياحية في سلطنة عمان. نحن نقدر خصوصيتك ونلتزم بحماية معلوماتك
            الشخصية. باستخدام هذا الموقع، فإنك توافق على الشروط الموضحة في سياسة
            الخصوصية هذه.
          </p>

          <h2 className="text-2xl font-bold mb-4">المعلومات التي نجمعها</h2>
          <p className="mb-4">
            1. <strong>المعلومات الشخصية:</strong> عند إضافة مكان أو التفاعل مع
            منصتنا، قد نقوم بجمع معلومات شخصية مثل اسمك و عنوان بريدك الإلكتروني .
          </p>
          <p className="mb-4">
            2. <strong>معلومات الأماكن:</strong> أي مكان سياحي تضيفه، بما في
            ذلك الصور، الوصف، والموقع الجغرافي سيتم تخزينه في قاعدة بياناتنا.
          </p>
          <p className="mb-4">
          3.  <strong>معلومات الأماكن وحقوق التصرف بها : </strong>  
         تحفظ حقوق إضافة المكان السياحي للمستخدم بعد التأكد من صحة محتواها من قِبل فريقنا ، لكن لا يمكن للمستخدم أن يحذف أي منشور بعد تأكيده من قِبل الفريق .
          </p>

          <h2 className="text-2xl font-bold mb-4">كيف نستخدم معلوماتك</h2>
          <p className="mb-4">
            - لتقديم وتحسين خدماتنا.
            <br />- لتخصيص تجربة المستخدم بناءً على تفضيلاته.
            <br />- للحفاظ على أمان ووظائف الموقع.
            <br />- للتواصل معك بشأن التحديثات أو الأخبار ذات الصلة.
          </p>

          <h2 className="text-2xl font-bold mb-4">مشاركة المعلومات مع أطراف خارجية</h2>
          <p className="mb-4">
            نحن لا نبيع أو نتاجر بمعلوماتك الشخصية أو ننقلها إلى أطراف خارجية
            إلا إذا كان ذلك مطلوبًا بموجب القانون.
          </p>

          <h2 className="text-2xl font-bold mb-4">الأمان</h2>
          <p className="mb-4">
            نقوم بتطبيق إجراءات أمنية لضمان حماية معلوماتك الشخصية. ومع ذلك، لا
            يوجد نظام آمن تمامًا، ولا يمكننا ضمان الحماية الكاملة.
          </p>

          <h2 className="text-2xl font-bold mb-4">حقوقك</h2>
          <p className="mb-4">
            لديك الحق في طلب الوصول إلى البيانات الشخصية التي نحتفظ بها عنك،
            وتصحيحها أو حذفها، أو الاعتراض على معالجتها في ظروف معينة.
          </p>

          <h2 className="text-2xl font-bold mb-4">اتصل بنا</h2>
          <p className="mb-4">
            إذا كانت لديك أي استفسارات حول هذه السياسة، يُرجى الاتصال بنا على
            almlah.oman@gmail.com  
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-4">
            Welcome to Al Mlah. This website is dedicated to showcasing and
            covering tourism spots in Oman. We value your privacy and are committed
            to protecting your personal information. By using this website, you
            agree to the terms outlined in this Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <p className="mb-4">
            1. <strong>Personal Information:</strong> When you add a place or
            interact with our platform, we may collect personal details such as your
            name, email address, and location.
          </p>
          <p className="mb-4">
            2. <strong>Place Information:</strong> Any tourism spot you add,
            including photos, descriptions, and geographic locations, will be stored
            in our database.
          </p>
          <p className="mb-4">
            3. <strong>Place Information and Usage Rights:</strong>
            The user retains the rights to add a tourism spot after its content has been verified by our team. However, the user cannot delete any post after it has been confirmed by the team.
          </p>


          <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            - To provide and enhance our services.
            <br />- To personalize the user experience based on your preferences.
            <br />- To maintain the security and functionality of the website.
            <br />- To contact you regarding updates or relevant news.
          </p>

          <h2 className="text-2xl font-bold mb-4">Third-Party Sharing</h2>
          <p className="mb-4">
            We do not sell, trade, or otherwise transfer your personal information
            to outside parties unless required by law.
          </p>

          <h2 className="text-2xl font-bold mb-4">Security</h2>
          <p className="mb-4">
            We implement security measures to ensure that your personal information
            is protected. However, no system is fully secure, and we cannot guarantee
            complete protection.
          </p>

          <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
          <p className="mb-4">
            You have the right to request access to the personal data we hold about
            you, to correct or delete it, or to object to its processing under
            certain conditions.
          </p>

          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this policy, please contact us at almlah.oman@gmail.com
          </p>
        </div>
      )}
    </div>
  );
}
