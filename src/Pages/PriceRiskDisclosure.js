import React, { useEffect } from "react";

const PriceRiskDisclosure = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="Utilities">
      <div className="UtilitiesHeroSection text-white text-center d-flex flex-column align-items-center w-100 justify-content-center">
        <div className="container-lg text-center text-white">
          <h1 className="Utilities_Hero_Section_Heading text-uppercase mb-0">
            Price Risk Disclosure
          </h1>
        </div>
      </div>

      <div className="container-lg">
        <div className="Utilities_Hero_Container">
          <div className="py-5 ">
            <h1 className="Policy_Heading">DISCLOSURES & RISKS</h1>
            <h2 className="Policy_Heading">Notification</h2>

            <p>
              Drift hereby notifies each User of certain disclosures and risks
              associated with blockchain currencies and tokens and their
              associated technology and protocols. Drift Services are not an
              investment product, and no action, notice, communication by any
              means, or omission by Drift shall be understood or interpreted as
              such. Drift has no influence whatsoever on the price of Drift
              tokens. Ownership of a Drift token or the use of Drift Services
              does not represent or constitute any ownership right or stake,
              share or security, debt or equivalent right, or any right to
              receive any future revenue or form of participation in or relating
              to any blockchain or digital currency.
            </p>
            <h2 className="Policy_Heading">Digital Currencies</h2>
            <p>
              Digital currencies are not considered legal tender, are not issued
              or backed by any government, and have fewer regulatory protections
              than traditional currency. Moreover, digital currencies are not
              insured against theft or loss by any insurance corporation or any
              investor protection, including the Federal Deposit Insurance
              Corporation or the Securities Investor Protection Corporation.
            </p>

            <h2 className="Policy_Heading">Market Risk</h2>
            <p>
              The value of digital currencies are derived from supply and demand
              in the global marketplace, which can rise or fall independent of
              any government currency. Holding digital currencies carries
              exchange rate and other types of risk. The value of digital
              currencies may be derived from the continued willingness of market
              participants to exchange traditional government currency for
              digital currencies, which may result in the potential for
              permanent and total loss of value of a particular digital currency
              should the market disappear. The volatility and unpredictability
              of the price and value of digital currencies, relative to
              government currencies, may result in significant loss over a short
              period of time. Drift cannot guarantee or warrant the value of the
              Drift token, and explicitly warns the User that there is no reason
              to believe that any digital currency will increase in value, and
              that they may hold no value, decrease in value, or entirely lose
              value.
            </p>

            <h2 className="Policy_Heading">Regulatory Risk</h2>
            <p>
              Legislative and regulatory changes or actions at the state,
              federal, or international level may adversely affect the use,
              transfer, exchange, and value of digital currencies. The
              regulatory status of cryptographic tokens, digital assets and
              blockchain technology is unclear or unsettled in many
              jurisdictions. It is difficult to predict how or whether
              governmental authorities will regulate such technologies. It is
              likewise difficult to predict how or whether any governmental
              authority may make changes to existing laws, regulations and/or
              rules that will affect cryptographic tokens, digital assets,
              blockchain technology and its applications. Such changes could
              negatively impact the Drift Services in various ways, including,
              for example, through a determination that any of the above are
              regulated financial instruments that require registration. Drift
              may cease any distribution of any of the above, the development of
              Drift products or cease operations in a jurisdiction in the event
              that governmental actions make it unlawful or commercially
              undesirable to continue to do so. The industry in which Drift
              operates is new, and may be subject to heightened oversight and
              scrutiny, including investigations or enforcement actions. There
              can be no assurance that governmental, quasi-governmental,
              regulatory or other similar types of (including banking)
              authorities will not examine the operations of Drift and/or pursue
              enforcement actions against Drift. Such governmental activities
              may or may not be the result of targeting Drift in particular. All
              of this may subject Drift to judgments, settlements, fines or
              penalties, or cause Drift to restructure its operations and
              activities or to cease offering certain products or services, all
              of which could harm Drift’s reputation or lead to higher
              operational costs, which may in turn have a material adverse
              effect on Drift Services.
            </p>
            <h2 className="Policy_Heading">Technology Risk</h2>
            <p>
              Digital currency transactions may be irreversible and losses due
              to fraudulent or accidental transactions may not be recoverable.
              Some virtual transactions are deemed to be made when recorded on a
              public ledger, which may not necessarily be the date or time the
              user initiated the transaction. The nature of such virtual
              transactions may lead to an increased risk of fraud or
              cyber-attacks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRiskDisclosure;
