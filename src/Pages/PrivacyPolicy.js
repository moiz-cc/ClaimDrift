import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="Utilities">
      <div className="UtilitiesHeroSection text-white text-center d-flex flex-column align-items-center w-100 justify-content-center">
        <div className="container-lg text-center text-white">
          <h1 className="Utilities_Hero_Section_Heading text-uppercase mb-0">
            Privacy policy
          </h1>
        </div>
      </div>

      <div className="container-lg">
        <div className="Utilities_Hero_Container">
          <div className="py-5 ">
            <p>
              This Privacy Policy, as amended or otherwise changed from time to
              time (this “Privacy Policy”), explains the manner in which Drift
              Studio, and its subsidiaries, parent companies, affiliates, and
              other corporate entities under common ownership including, but not
              limited to, all websites that link this Privacy Policy (“DRIFT”,
              “we“, “us“, or “our“) collects, uses, maintains and discloses user
              information obtained through its websites, applications, brands,
              services and products (collectively, “Services”). Whenever you
              access or use the Services, you are accepting the terms and
              conditions of this Privacy Policy. If you do not agree with any
              aspect of this Privacy Policy, you should immediately discontinue
              access or use of the Services.
            </p>

            <h2 className="Policy_Heading mt-5 ">
              Privacy Policy Updates and Changes
            </h2>

            <p>
              On occasion, Drift may update and change this Privacy Policy to
              reflect changes in law, our personal data collection and use
              practices, the features available through the Services, or
              advances in technology. If material changes are made to this
              Privacy Policy, the changes will be prominently posted on websites
              and applications. Capitalized terms not defined herein shall have
              the meanings ascribed to them in Drift’s Terms and Conditions.
            </p>
            <h2 className="Policy_Heading mt-5 ">Pertinent Definitions</h2>

            <p>
              “Personal Data” means data you may give Drift to identify or
              contact you, including, for example, your name, address, User ID,
              telephone number, email address, any blockchain addresses, as well
              as any other non-public information about you that is associated
              with or linked to any of the foregoing data.
            </p>
            <p>
              “Anonymous Data” means data that is not associated with or linked
              to your Personal Data; Anonymous Data does not, by itself, permit
              the identification of individual persons.
            </p>
            <p>
              Lawful Basis for Processing We only collect and process Personal
              Data about you where we have lawful bases to do so. Lawful bases
              include consent where you have given consent, contract, and
              legitimate interests.
            </p>

            <h2 className="Policy_Heading mt-5 ">Information We Collect</h2>

            <ul className=" text-black m-0 p-0 my-3">
              <li className="text-black">
                We may collect Personal Data from you, such as your first and
                last name, email and mailing addresses, User ID, date of birth,
                government issued identification, and password when you register
                for an account on the Services (“Account”) or otherwise use the
                Services.
              </li>
              <li className="text-black">
                We may also collect other Personal Data provided by third party
                identity verification services or via social networking
                websites. If you tell us where you are (e.g., by allowing your
                mobile device or computer to send us your location), we may
                store that information.
              </li>
              <li className="text-black">
                We may collect your Personal Data, such as your User ID and it
                may be used to track you across devices and connect you to
                alternative datasets that we have, including but not limited to
                your wallet.
              </li>
              <li className="text-black">
                Certain services, such as two-factor authentication, may require
                our collection of your phone number. We may associate that phone
                number to your mobile device identification information.
              </li>
              <li className="text-black">
                If you provide us feedback or contact us via email, message chat
                or similar functionality, we will collect your name and email
                address, as well as any other content included in the
                communication, in order to send you a reply.
              </li>
              <li className="text-black">
                Transactional information when you request information or
                purchase a product or service from us.
              </li>
              <li className="text-black">
                We also collect other types of Personal Data that you provide to
                us voluntarily when seeking support services, such as email,
                information submitted via online forms, video conferencing
                service information, other contact information, or other
                information provided to support services staff.
              </li>
              <li className="text-black">
                We may collect other data, including but not limited to,
                referral URLs, your location, blockchain analytics information
                related to blockchain addresses you provide.
              </li>
            </ul>

            <p>Some information is Collected automatically by our servers:</p>

            <ul className=" text-black m-0 p-0 my-3">
              <li className="text-black">
                Our servers (which may be hosted by a third party service
                provider) collect information from you, including your browser
                type, operating system, Internet Protocol (“IP”) address (a
                number that is automatically assigned to your computer when you
                use the Internet, which may vary from session to session),
                domain name, and/or a date/time stamp for your visit.
              </li>
              <li className="text-black">
                Like for most websites, we gather certain information
                automatically and store it in log files. This information
                includes IP addresses, browser type, Internet service provider
                (“ISP”), referring/exit pages, operating system, date/time
                stamp, and clickstream data.
              </li>
              <li className="text-black">
                Like many online services, we use cookies to collect
                information. “Cookies” are small pieces of information that a
                website sends to your computer’s hard drive while you are
                viewing the website.
              </li>
              <li className="text-black">
                We retain information on your behalf, such as transactional data
                and other session data linked to your Account.
              </li>
            </ul>
            <h2 className="Policy_Heading mt-5 ">
              How We Use Your Information
            </h2>
            <p>
              We will only use your Personal Data when the law allows. Please
              note that we may process your Personal Data without your knowledge
              or consent where this is required or permitted by law. In general,
              Personal Data you submit to us is used either to respond to
              requests that you make, or to aid us in serving you better. We use
              your Personal Data in the following ways
            </p>
            <ul className=" text-black m-0 p-0 my-3">
              <li className="text-black">
                facilitate the creation of and secure your Account on the
                network;
              </li>
              <li className="text-black">
                identify you and perform identity verification through a service
                provider;
              </li>
              <li className="text-black">
                provide improved administration of our websites and Services;
              </li>
              <li className="text-black">
                improve the quality of experience when you interact with our
                websites and Services;
              </li>
              <li className="text-black">
                send you a welcome email to verify ownership of the email
                address provided when your Account is created;
              </li>
              <li className="text-black">
                send you administrative email notifications, such as Account
                activity, transaction processing, security or support and
                maintenance advisories;
              </li>
              <li className="text-black">
                identify, prevent, and report potentially suspicious,
                fraudulent, or illegal activities;
              </li>
              <li className="text-black">
                notify you about important changes to our Terms and Conditions
                or Privacy Policy; and respond to your inquiries or other
                requests.
              </li>
              <li className="text-black">
                We use IP addresses to make our website and Services more useful
                to you, and to perform identity verification.
              </li>
            </ul>

            <p>
              All data collected automatically will be used to administer or
              improve our Services.
            </p>
            <ul className=" text-black m-0 p-0 my-3">
              <li className="text-black">
                We use IP addresses to make our website and Services more useful
                to you, and to perform identity verification.
              </li>
              <li className="text-black">
                We use information from log files to analyze trends, administer
                the Services, track users’ movements around the Services, gather
                demographic information about our user base as a whole, and
                better tailor our Services to our users’ needs. Except as noted
                in this Privacy Policy, we do not link this
                automatically-collected data to Personal Data.
              </li>
              <li className="text-black">
                We may use both session Cookies (which expire once you close
                your web browser) and persistent Cookies (which stay on your
                computer until you delete them) to provide you with a more
                personal and interactive experience with our Services. This type
                of information is collected to make the Services more useful to
                you and to tailor the experience with us to meet your special
                interests and needs.
              </li>
            </ul>
            <p>
              We may create Anonymous Data records from Personal Data by
              excluding information (such as your name) that makes the data
              personally identifiable to you. We use this Anonymous Data to
              analyze request and usage patterns so that we may enhance the
              content and navigation of our Services. We reserve the right to
              use Anonymous Data and aggregated and other de-identified
              information for any purpose and disclose Anonymous Data to third
              parties in our sole discretion. Drift does not sell user data to
              any third party.
            </p>
            <p>
              We may collect data that is necessary to identify, examine, and
              prevent fraud, cheating and other violations of our Terms and
              Conditions and applicable laws ("Violations"). This data is used
              only to identify, examine, and prevent Violations. Such data will
              be retained for the minimum amount of time required to fulfill
              this purpose. If the data shows that Violations have occurred, we
              will retain the data further to establish, exercise, or defend any
              legal claims during the applicable statute of limitations or until
              the legal case or a related legal case has been resolved. This
              data may not be disclosed to you if such disclosure will adversely
              affect our efforts to identify, examine, and prevent Violation
            </p>

            <h2 className="Policy_Heading">Retention of Personal Data</h2>
            <p>
              Unless the law specifies a different retention period, we will
              only keep your Personal Data for the time strictly necessary to
              carry out the operations for which said Data has been collected by
              us.
            </p>
            <p>Personal Data destruction procedures and methods</p>
            <p>
              In principle, we destroy Personal Data without delay after the
              purpose of collection and use of Personal Data is achieved.
              However, this is not the case when preservation is required
              according to laws and regulations.
            </p>
            <p>The destruction procedure and method are as follows:</p>
            <ul className=" text-black m-0 p-0 my-3">
              <li className="text-black">
                Personal Data printed on paper: shredded with a shredder or
                incinerated
              </li>
              <li className="text-black">
                Personal Data stored in electronic file format: Deleted using a
                technical method that cannot reproduce the record.
              </li>
            </ul>
            <h2 className="Policy_Heading">Marketing</h2>
            <p>
              We strive to provide you with choices regarding certain Personal
              Data uses, particularly around marketing and advertising. We have
              established the following Personal Data control mechanisms:
            </p>
            <p>
              We may use your Personal Data to form a view on what Services we
              think may be of interest to you. You will receive marketing
              communications from us if (i) you have requested information from
              us; or (ii) use our Services, in each case, you have chosen to
              opt-in and not opted out of receiving marketing communications. We
              may transfer or otherwise make available your Personal Data to
              authorized third parties, including affiliates, and associate
              partners/business partners. We will get your express opt-in
              consent before we share your Personal Data with any company
              outside of Drift for marketing purposes.
            </p>
            <p>
              You acknowledge by providing your personal information in
              connection with receiving services from Drift, that you have an
              established business relationship with Drift. As such, you provide
              Drift with express consent to contact you using your personal
              information for all matters relative to your services with Drift.
              This may include the use of autodialed or pre-recorded telephonic
              communications for operational communication, which may include
              the verification of your personal information, the collection of a
              debt, or any other necessary communication or confirmation in
              connection with any element of your ongoing service with Drift.
              You further acknowledge that this established business
              relationship may extend beyond the standard eighteen months from
              the last transaction standard. You understand that services with
              Drift may not have such a transaction within eighteen months, but
              that the relationship will still be considered as ongoing due to
              the specific nature of Drift services. The established business
              relationship which is created upon the initiation of services, and
              the providing of personal information to Drift shall continue for
              five years following the providing or updating of any personal
              information in connection with your services with Drift. With
              respect to sales and marketing from Drift specifically, you
              understand that the same existing business relationship standard
              applies.
            </p>
            <p>
              You can ask us or third parties to stop sending you marketing
              messages at any time by following the opt-out links on any
              marketing message sent to you or by contacting us. However, where
              you opt out of receiving marketing messages, this will not apply
              to Personal Data provided to us as a result of your use of our
              Service, a product/service experience or other transactions.
              Further, Drift Studio is not responsible for the collection and
              use of your Personal Data by any Company outside of Drift Studio.
              Drift Studio assumes no liability whatsoever for any disclosure of
              Personal Data due to unauthorized third-party access or other acts
              of third parties, or any other acts or omissions beyond the
              reasonable control of Drift Studio.
            </p>
            <p>
              How we Share your Information – Personal Data shared with third
              parties. We disclose your Personal Data as described below and as
              described elsewhere in this Privacy Policy.
            </p>
            <ul className=" text-black m-0 p-0 my-3">
              <li className="text-black">
                It may be necessary to disclose your Personal Data to comply
                with any legal obligations, to defend or investigate any illegal
                or suspected violations of Drift’s Terms and Conditions, to
                enforce our Terms and Conditions and this Privacy Policy, or to
                protect the rights, safety, and security of Drift, our users, or
                the public.
              </li>
              <li className="text-black">
                We may share your Personal Data with third party service
                providers to provide you with the Services; to conduct quality
                assurance testing; to facilitate creation of accounts; to
                provide technical support; and to verify your identity. These
                third party service providers are required not to use your
                Personal Data other than to provide the services requested by
                you.
              </li>
              <li className="text-black">
                We may share some or all of your Personal Data with third
                parties (e.g. the purchaser or new owner) in connection with or
                during negotiation of any merger, financing, acquisition or
                dissolution transaction or proceeding involving the sale,
                transfer, divestiture, or disclosure of all or a portion of our
                business or assets. In the event of an insolvency, bankruptcy,
                or receivership, Personal Data may also be transferred as a
                business asset. If another company acquires Drift assets, that
                company will possess the Personal Data collected by Drift and
                will assume the rights and obligations regarding your Personal
                Data as described in this Privacy Policy.
              </li>
            </ul>
            <p>
              Our Services may contain links to other third party or external
              affiliates’ websites, extensions, and resources which are
              regulated by their own privacy policies. Drift is not responsible
              for the privacy policies of these third party websites even if
              they were accessed using links from our Services. We do not have
              any control or authority over the content of those sites,
              extensions or resources provided by third parties or external
              affiliates, and accept no liability for any losses caused by them,
              if you access or use any of the third-party links, extensions or
              resources. It is solely at your own risk and you will be subject
              to third parties’ separate terms and conditions of use.
            </p>
            <p>
              Other than as stated in this Privacy Policy, Drift does not
              disclose any of your Personal Data to third parties unless
              required to do so by law enforcement, court order, or in
              compliance with legal reporting obligations.
            </p>

            <h2 className="Policy_Heading">Transfers outside of the EEA </h2>
            <p>
              We may share your Personal Data within Drift and other companies
              that assist in providing Drift Services which are based in various
              locations globally. If you are based in Europe, this will involve
              transferring your data outside the European Economic Area (EEA).
              In addition, many of our external third parties are also based
              outside of the EEA so their processing of your Personal Data will
              involve a transfer of data outside the EEA. We may transfer
              personal data from EEA to third countries outside of EEA, under
              the following conditions:
            </p>
            <ul className=" text-black m-0 p-0 my-3">
              <li className="text-black">
                Contractual Obligation: Where transfers are necessary to satisfy
                our obligation to you under our EULA, including to provide you
                with our services and customer support services, and to optimize
                Drift Studio; and
              </li>
              <li className="text-black">
                Consent: where you have consented to the transfer of your
                Personal Data to a third country.
              </li>
            </ul>
            <p>
              Whenever we transfer your Personal Data out of the EEA, we ensure
              a similar degree of protection is afforded to it by ensuring at
              least one of the following safeguards is implemented:
            </p>
            <ul className=" text-black m-0 p-0 my-3">
              <li className="text-black">
                We will only transfer your Personal Data to countries that have
                been deemed to provide an adequate level of protection for
                personal data by the European Commission. For further details,
                see
                <Link
                  to={
                    "https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en"
                  }
                  target="_blank"
                >
                  {" "}
                  European Commission: Adequacy Decisions
                </Link>
              </li>
              <li className="text-black">
                We may use specific contracts approved by the European
                Commission which give Personal Data the same protection it has
                in Europe. For further details, see
                <Link
                  to={
                    "https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en"
                  }
                  target="_blank"
                >
                  {" "}
                  European Commission: EU Standard Contractual Clauses
                </Link>
              </li>
              <li className="text-black">
                In respect of transfers to entities in the US, we may transfer
                Personal Data to them if they are part of the Privacy Shield
                which requires them to provide similar protection to personal
                data shared between Europe and the US. For further details, see
                <Link
                  to={
                    "https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en#commercial-sector-adequacy-decision-on-the-eu-us-data-privacy-framework"
                  }
                  target="_blank"
                >
                  {" "}
                  European Commission: EU-US Data Transfers
                </Link>
              </li>
            </ul>
            <p>
              Please contact us if you want further information on the specific
              mechanism used by us when transferring your Personal Data out of
              the EEA. If you wish to be informed about what Personal Data we
              hold and want it removed from our systems, please contact us at
              <Link to={"mailto:support@drifttoken.io"}>
                {" "}
                support@drifttoken.io
              </Link>
            </p>

            <h2 className="Policy_Heading">Updating Information</h2>
            <p>
              You can update your personal or account information by contacting
              our support team at
              <Link to={"mailto:support@drifttoken.io"}>
                {" "}
                support@drifttoken.io
              </Link>
            </p>
            <p>
              We will retain your information for as long as your Account is not
              closed or as needed to provide you access to your Account. If you
              wish to close your Account, open a ticket in our support center.
              We will retain and use your information as necessary to comply
              with our legal obligations, resolve disputes, and enforce our
              Terms and Conditions.
            </p>

            <h2 className="Policy_Heading">Cookies</h2>
            <p>
              We collect web browser information in order to enhance your
              experience when using our Services and track how the Services are
              being used. Cookies are small data files that are stored on your
              computer’s hard drive, and in addition to using cookies to provide
              you with a better user experience, we use cookies to identify and
              prevent fraudulent activity. The information collected can
              include, but is not limited to, your IP address, referral URLs,
              the type of device you use, your operating system, the type of
              browser you use, geographic location, and other session data.
              Cookies are not permanent and will expire after a short time
              period of inactivity. You may opt to deactivate your cookies, but
              it is important to note that you may not be able to access or use
              some features of our Services. Please note that Drift is not
              responsible and cannot be held liable for any loss resulting from
              your decision or inability to use such features. Do Not Track
              (“DNT”) is an optional browser setting that allows you to express
              your preferences regarding tracking by advertisers and other
              third-parties. At this time, we do not respond to DNT signals.
            </p>

            <h2 className="Policy_Heading">Google Analytics</h2>
            <p>
              We use Google Analytics to collect and process data. For details
              on how Google uses such data, please refer to "How Google uses
              data when you use our partners' sites or apps" located at
              <Link
                to={"http://www.google.com/policies/privacy/partners/"}
                target="_blank"
              >
                {" "}
                www.google.com/policies/privacy/partners
              </Link>
            </p>
            <p>
              Additionally we make use of Google Analytics Advertising Features,
              specifically Data Collection for Google Signals. This feature
              allows us to collect data on our site and user traffic, which
              enables us to remarket that traffic through retargeting
              advertisements. Users may opt-out of the Google Analytics
              Advertising Features by using ad settings, extensions (such as
              those offered by Google at
              <Link
                to={"https://tools.google.com/dlpage/gaoptout/"}
                target="_blank"
              >
                {" "}
                https://tools.google.com/dlpage/gaoptout/
              </Link>
              ), or any other available means (such as the NAI's consumer
              opt-out located at
              <Link
                to={"https://optout.networkadvertising.org/?c%3D1"}
                target="_blank"
              >
                {" "}
                https://optout.networkadvertising.org/?c=1
              </Link>
              ).
            </p>

            <h2 className="Policy_Heading">Security of Information</h2>
            <p>
              We take the protection of your Personal Data seriously. We use
              industry-standard data encryption technology and have implemented
              restrictions related to the storage of and the ability to access
              your Personal Data. However, please note that no transmission over
              the Internet or method of electronic storage can be guaranteed to
              be 100% secure. Additionally, we aim to enforce internal
              regulations and rectify issues as soon as they are discovered.
            </p>
            <h2 className="Policy_Heading">
              Legal Rights Concerning Your Information
            </h2>
            <p>
              Under certain circumstances, you have rights under data protection
              laws in relation to your Personal Data which are set out in more
              detail below:
            </p>

            <table className="Policy table LegalRights  mb-0">
              <tbody>
                <tr>
                  <th scope="row" className="  fw-bold">
                    Request access
                  </th>
                  <td className="">
                    <div className="d-flex align-items-center gap-3">
                      <span className=" text-dark FS_16 fw-normal text-normal">
                        Under certain circumstances, you have rights under data
                        protection laws in relation to your Personal Data which
                        are set out in more detail below:
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="  fw-bold">
                    Request correction
                  </th>
                  <td className="">
                    <div className="d-flex align-items-center gap-3">
                      <span className=" text-dark FS_16 fw-normal text-normal">
                        This enables you to have any incomplete or inaccurate
                        data we hold about you corrected, though we may need to
                        verify the accuracy of the new data you provide to us.
                        If you need to add or change any information, you can
                        log into your Account and make the change in your
                        settings. If it doesn’t look like you can make the
                        change on your own, please reach out to us at
                        <Link to={"mailto:support@drifttoken.io"}>
                          {" "}
                          support@drifttoken.io
                        </Link>
                        and we will endeavor to correct any errors.
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="  fw-bold">
                    Request deletion
                  </th>
                  <td className="">
                    <div className="d-flex align-items-center gap-3">
                      <span className=" text-dark FS_16 fw-normal text-normal">
                        This enables you to ask us to delete or remove Personal
                        Data where there is no good reason for us continuing to
                        process it. You also have the right to ask us to delete
                        or remove your Personal Data where you have successfully
                        exercised your right to object to processing (see
                        below), where we may have processed your information
                        unlawfully or where we are required to erase your
                        Personal Data to comply with applicable law. Please
                        note: your right of deletion would not apply for various
                        reasons including if we need to retain your Personal
                        Data in order to comply with a legal obligation or to
                        establish or defend a legal claim. Where we are unable
                        to comply with your request of deletion, we will notify
                        you at the time of your request.
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="  fw-bold">
                    Object to processing
                  </th>
                  <td className="">
                    <div className="d-flex align-items-center gap-3">
                      <span className=" text-dark FS_16 fw-normal text-normal">
                        You have the right to object to the processing of your
                        Personal Data where we are relying on a legitimate
                        interest (or those of a third party) and there is
                        something about your particular situation which makes
                        you want to object to processing on this ground, as you
                        feel it impacts on your fundamental rights and freedoms.
                        You also have the right to object where we are
                        processing your Personal Data for direct marketing
                        purposes. In some cases, we may demonstrate that we have
                        compelling legitimate grounds to process your
                        information which override your rights and freedoms.
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="  fw-bold">
                    Request restriction of processing
                  </th>
                  <td className="">
                    <div className="d-flex align-items-center gap-3">
                      <span className=" text-dark FS_16 fw-normal text-normal">
                        This enables you to ask us to suspend the processing of
                        your Personal Data in the following scenarios: (a) if
                        you want us to establish the data’s accuracy; (b) where
                        our use of the data is unlawful but you do not want us
                        to delete it; (c) where you need us to hold the data
                        even if we no longer require it as you need it to
                        establish, exercise or defend legal claims; or (d) you
                        have objected to our use of your data but we need to
                        verify whether we have overriding legitimate grounds to
                        use it.
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="  fw-bold">
                    Request to transfer
                  </th>
                  <td className="">
                    <div className="d-flex align-items-center gap-3">
                      <span className=" text-dark FS_16 fw-normal text-normal">
                        If you request of us, we will provide you or a third
                        party you have chosen, your Personal Data in a
                        structured, commonly used, machine-readable format. Note
                        that this right only applies to automated information
                        which you initially provided consent for us to use or
                        where we used the information to perform a contract with
                        you.
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="  fw-bold">
                    Withdrawal of consent
                  </th>
                  <td className="">
                    <div className="d-flex align-items-center gap-3">
                      <span className=" text-dark FS_16 fw-normal text-normal">
                        This applies where we are relying on consent to process
                        your Personal Data. However, this will not affect the
                        lawfulness of any processing carried out before you
                        withdraw your consent. If you withdraw your consent, we
                        may not be able to provide certain products or services
                        to you. We will advise you if this is the case at the
                        time you withdraw your consent.
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="mt-3">
              If you wish to exercise any of the rights set out above, please
              contact us at{" "}
              <Link to={"mailto:support@drifttoken.io"}>
                {" "}
                support@drifttoken.io
              </Link>
              .
            </p>

            <h2 className="Policy_Heading">Accessing your Information</h2>
            <p>
              You will not have to pay a fee to access your Personal Data (or to
              exercise any of the other rights). However, we may charge a
              reasonable fee if your request is clearly unfounded, repetitive or
              excessive. Alternatively, we may refuse to comply with your
              request in these circumstances.
            </p>
            <p>
              We may need to request specific information from you to help us
              confirm your identity and ensure your rights to access your
              Personal Data (or to exercise any of your other rights). This is a
              security measure to ensure that Personal Data is not disclosed to
              any person who has no right to receive it. We may also contact you
              to ask you for further information in relation to your request to
              speed up our response.
            </p>
            <p>
              We try to respond to all legitimate requests within one month.
              Occasionally it may take us longer than a month if your request is
              particularly complex or you have made a number of requests. In
              this case, we will notify you and keep you updated.
            </p>

            <h2 className="Policy_Heading">California Residents</h2>
            <p>
              If you are a California resident, you may have certain rights with
              respect to your Personal Data, including the following:
            </p>
            <ul className=" text-black m-0 p-0 my-3">
              <li className="text-black">
                the right to know, by way of our Privacy Policy and any specific
                inquiries you direct to us, the source of the Personal Data we
                have about you, what we use that information for, whether it is
                being disclosed or sold, and to whom it is being disclosed or
                sold;
              </li>
              <li className="text-black">
                the right, subject to certain exceptions, to have your personal
                information deleted from our possession or control; and
              </li>
              <li className="text-black">
                right to opt-out from the sale of your Personal Data. As
                described in the section above, we do not sell Personal Data;
              </li>
              <li className="text-black">
                right to not be discriminated against for exercising your rights
                under the CCPA.
              </li>
            </ul>
            <p>
              California Civil Code Section 1798.83 permits California residents
              who use our website to request certain information regarding our
              disclosure of personal information to third parties for their
              direct marketing purposes. To make such a request, or if you have
              any questions or concerns about your California privacy rights,
              our Privacy Policy, or our use of your personal information,
              please send an email to
              <Link to={"mailto:support@drifttoken.io"}>
                {" "}
                support@drifttoken.io
              </Link>
              .
            </p>
            <p>
              For all California residents, any such inquiries shall be
              responded to within forty-five (45) days. We must verify your
              identity with respect to such inquiries. Depending on the nature
              of the Personal Information at issue, we may require additional
              measures or information from you as part of that verification.
            </p>
            <p>
              For California residents under age 18 who have publicly posted
              content or information, you may request and obtain removal of such
              content or information pursuant to California Business and
              Professions Code Section 22581, provided you are a registered user
              of any website where this Policy is posted. To make such a
              request, please send an email with a detailed description of the
              specific content or information to{" "}
              <Link to={"mailto:support@drifttoken.io"}>
                {" "}
                support@drifttoken.io
              </Link>
            </p>
            <h2 className="Policy_Heading">Children’s Privacy</h2>
            <p>
              If you’re under 18, you cannot use our Services without parental
              consent. We do not knowingly solicit or collect information from
              anyone under 18. If we become aware that a person under the age of
              18 has provided us with Personal Data without verification and
              parental consent, we will work to delete it immediately.
            </p>
            <h2 className="Policy_Heading">Contact Us</h2>
            <p>
              If you have any queries or complaints about our collection, use or
              storage of your Personal Data, or if you wish to exercise any of
              your rights in relation to your personal information, please
              contact us at
              <Link to={"mailto:support@drifttoken.io"}>
                {" "}
                support@drifttoken.io
              </Link>
              . We will investigate and attempt to resolve any such complaint or
              dispute regarding the use or disclosure of your Personal Data.
            </p>
            <p>
              Based on the applicable laws of your country, you may have a right
              to request access to the Personal Data we collect from you,
              change, or delete the Personal Data. To request the review, update
              or removal of your Personal Data, please contact
              <Link to={"mailto:support@drifttoken.io"}>
                {" "}
                support@drifttoken.io
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
