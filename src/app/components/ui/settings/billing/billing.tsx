'use client'
import React from 'react'
import { useState,useEffect,useRef } from 'react'
type Props = {}

const Billing = (props: Props) => {
    const [subscriptions,setSubscriptions]=useState('');//Access Stripe
    const [payments, setPayments]=useState('');//Access Stripe
    const [billingHistory,setBillingHistory]=useState('');
    const [renewal,setRenewal]=useState('')
  return (
    <div className='' >Billing</div>
  )
}

export default Billing